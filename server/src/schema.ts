import { z } from 'zod';

// Course schemas
export const courseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  estimated_duration_hours: z.number().int().positive(),
  is_published: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Course = z.infer<typeof courseSchema>;

export const createCourseInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  estimated_duration_hours: z.number().int().positive(),
  is_published: z.boolean().default(false),
});

export type CreateCourseInput = z.infer<typeof createCourseInputSchema>;

export const updateCourseInputSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  estimated_duration_hours: z.number().int().positive().optional(),
  is_published: z.boolean().optional(),
});

export type UpdateCourseInput = z.infer<typeof updateCourseInputSchema>;

// Module schemas
export const moduleSchema = z.object({
  id: z.number(),
  course_id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  sort_order: z.number().int().nonnegative(),
  is_published: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Module = z.infer<typeof moduleSchema>;

export const createModuleInputSchema = z.object({
  course_id: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable(),
  sort_order: z.number().int().nonnegative(),
  is_published: z.boolean().default(false),
});

export type CreateModuleInput = z.infer<typeof createModuleInputSchema>;

export const updateModuleInputSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  sort_order: z.number().int().nonnegative().optional(),
  is_published: z.boolean().optional(),
});

export type UpdateModuleInput = z.infer<typeof updateModuleInputSchema>;

// Lesson schemas
export const lessonSchema = z.object({
  id: z.number(),
  module_id: z.number(),
  title: z.string(),
  content: z.string(),
  lesson_type: z.enum(['reading', 'exercise', 'quiz', 'video']),
  sort_order: z.number().int().nonnegative(),
  estimated_duration_minutes: z.number().int().positive(),
  is_published: z.boolean(),
  exercise_data: z.string().nullable(), // JSON string for exercise configuration
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Lesson = z.infer<typeof lessonSchema>;

export const createLessonInputSchema = z.object({
  module_id: z.number(),
  title: z.string().min(1, "Title is required"),
  content: z.string(),
  lesson_type: z.enum(['reading', 'exercise', 'quiz', 'video']),
  sort_order: z.number().int().nonnegative(),
  estimated_duration_minutes: z.number().int().positive(),
  is_published: z.boolean().default(false),
  exercise_data: z.string().nullable(),
});

export type CreateLessonInput = z.infer<typeof createLessonInputSchema>;

export const updateLessonInputSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  content: z.string().optional(),
  lesson_type: z.enum(['reading', 'exercise', 'quiz', 'video']).optional(),
  sort_order: z.number().int().nonnegative().optional(),
  estimated_duration_minutes: z.number().int().positive().optional(),
  is_published: z.boolean().optional(),
  exercise_data: z.string().nullable().optional(),
});

export type UpdateLessonInput = z.infer<typeof updateLessonInputSchema>;

// Composite schemas for nested data
export const courseWithModulesSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  estimated_duration_hours: z.number().int().positive(),
  is_published: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  modules: z.array(moduleSchema),
});

export type CourseWithModules = z.infer<typeof courseWithModulesSchema>;

export const moduleWithLessonsSchema = z.object({
  id: z.number(),
  course_id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  sort_order: z.number().int().nonnegative(),
  is_published: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  lessons: z.array(lessonSchema),
});

export type ModuleWithLessons = z.infer<typeof moduleWithLessonsSchema>;

export const fullCourseStructureSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  estimated_duration_hours: z.number().int().positive(),
  is_published: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  modules: z.array(moduleWithLessonsSchema),
});

export type FullCourseStructure = z.infer<typeof fullCourseStructureSchema>;

// Query parameter schemas
export const getCourseInputSchema = z.object({
  id: z.number(),
});

export type GetCourseInput = z.infer<typeof getCourseInputSchema>;

export const getModuleInputSchema = z.object({
  id: z.number(),
});

export type GetModuleInput = z.infer<typeof getModuleInputSchema>;

export const getLessonInputSchema = z.object({
  id: z.number(),
});

export type GetLessonInput = z.infer<typeof getLessonInputSchema>;

export const getModulesByCourseInputSchema = z.object({
  courseId: z.number(),
});

export type GetModulesByCourseInput = z.infer<typeof getModulesByCourseInputSchema>;

export const getLessonsByModuleInputSchema = z.object({
  moduleId: z.number(),
});

export type GetLessonsByModuleInput = z.infer<typeof getLessonsByModuleInputSchema>;

export const deleteCourseInputSchema = z.object({
  id: z.number(),
});

export type DeleteCourseInput = z.infer<typeof deleteCourseInputSchema>;

export const deleteModuleInputSchema = z.object({
  id: z.number(),
});

export type DeleteModuleInput = z.infer<typeof deleteModuleInputSchema>;

export const deleteLessonInputSchema = z.object({
  id: z.number(),
});

export type DeleteLessonInput = z.infer<typeof deleteLessonInputSchema>;