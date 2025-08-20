import { serial, text, pgTable, timestamp, integer, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const difficultyEnum = pgEnum('difficulty', ['beginner', 'intermediate', 'advanced']);
export const lessonTypeEnum = pgEnum('lesson_type', ['reading', 'exercise', 'quiz', 'video']);

// Courses table
export const coursesTable = pgTable('courses', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'), // Nullable by default
  difficulty: difficultyEnum('difficulty').notNull(),
  estimated_duration_hours: integer('estimated_duration_hours').notNull(),
  is_published: boolean('is_published').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Modules table
export const modulesTable = pgTable('modules', {
  id: serial('id').primaryKey(),
  course_id: integer('course_id').references(() => coursesTable.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  description: text('description'), // Nullable by default
  sort_order: integer('sort_order').notNull(),
  is_published: boolean('is_published').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Lessons table
export const lessonsTable = pgTable('lessons', {
  id: serial('id').primaryKey(),
  module_id: integer('module_id').references(() => modulesTable.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  lesson_type: lessonTypeEnum('lesson_type').notNull(),
  sort_order: integer('sort_order').notNull(),
  estimated_duration_minutes: integer('estimated_duration_minutes').notNull(),
  is_published: boolean('is_published').default(false).notNull(),
  exercise_data: text('exercise_data'), // JSON string for exercise configuration, nullable
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const coursesRelations = relations(coursesTable, ({ many }) => ({
  modules: many(modulesTable),
}));

export const modulesRelations = relations(modulesTable, ({ one, many }) => ({
  course: one(coursesTable, {
    fields: [modulesTable.course_id],
    references: [coursesTable.id],
  }),
  lessons: many(lessonsTable),
}));

export const lessonsRelations = relations(lessonsTable, ({ one }) => ({
  module: one(modulesTable, {
    fields: [lessonsTable.module_id],
    references: [modulesTable.id],
  }),
}));

// TypeScript types for the table schemas
export type Course = typeof coursesTable.$inferSelect;
export type NewCourse = typeof coursesTable.$inferInsert;

export type Module = typeof modulesTable.$inferSelect;
export type NewModule = typeof modulesTable.$inferInsert;

export type Lesson = typeof lessonsTable.$inferSelect;
export type NewLesson = typeof lessonsTable.$inferInsert;

// Export all tables and relations for proper query building
export const tables = {
  courses: coursesTable,
  modules: modulesTable,
  lessons: lessonsTable,
};

export const tableRelations = {
  coursesRelations,
  modulesRelations,
  lessonsRelations,
};