import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schemas
import {
  createCourseInputSchema,
  updateCourseInputSchema,
  deleteCourseInputSchema,
  getCourseInputSchema,
  createModuleInputSchema,
  updateModuleInputSchema,
  deleteModuleInputSchema,
  getModuleInputSchema,
  getModulesByCourseInputSchema,
  createLessonInputSchema,
  updateLessonInputSchema,
  deleteLessonInputSchema,
  getLessonInputSchema,
  getLessonsByModuleInputSchema,
} from './schema';

// Import handlers
import { createCourse } from './handlers/create_course';
import { getCourses } from './handlers/get_courses';
import { getCourse } from './handlers/get_course';
import { getCourseWithModules } from './handlers/get_course_with_modules';
import { getFullCourseStructure } from './handlers/get_full_course_structure';
import { updateCourse } from './handlers/update_course';
import { deleteCourse } from './handlers/delete_course';

import { createModule } from './handlers/create_module';
import { getModules } from './handlers/get_modules';
import { getModulesByCourse } from './handlers/get_modules_by_course';
import { getModule } from './handlers/get_module';
import { getModuleWithLessons } from './handlers/get_module_with_lessons';
import { updateModule } from './handlers/update_module';
import { deleteModule } from './handlers/delete_module';

import { createLesson } from './handlers/create_lesson';
import { getLessons } from './handlers/get_lessons';
import { getLessonsByModule } from './handlers/get_lessons_by_module';
import { getLesson } from './handlers/get_lesson';
import { updateLesson } from './handlers/update_lesson';
import { deleteLesson } from './handlers/delete_lesson';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Course routes
  createCourse: publicProcedure
    .input(createCourseInputSchema)
    .mutation(({ input }) => createCourse(input)),
  
  getCourses: publicProcedure
    .query(() => getCourses()),
  
  getCourse: publicProcedure
    .input(getCourseInputSchema)
    .query(({ input }) => getCourse(input)),
  
  getCourseWithModules: publicProcedure
    .input(getCourseInputSchema)
    .query(({ input }) => getCourseWithModules(input)),
  
  getFullCourseStructure: publicProcedure
    .input(getCourseInputSchema)
    .query(({ input }) => getFullCourseStructure(input)),
  
  updateCourse: publicProcedure
    .input(updateCourseInputSchema)
    .mutation(({ input }) => updateCourse(input)),
  
  deleteCourse: publicProcedure
    .input(deleteCourseInputSchema)
    .mutation(({ input }) => deleteCourse(input)),

  // Module routes
  createModule: publicProcedure
    .input(createModuleInputSchema)
    .mutation(({ input }) => createModule(input)),
  
  getModules: publicProcedure
    .query(() => getModules()),
  
  getModulesByCourse: publicProcedure
    .input(getModulesByCourseInputSchema)
    .query(({ input }) => getModulesByCourse(input)),
  
  getModule: publicProcedure
    .input(getModuleInputSchema)
    .query(({ input }) => getModule(input)),
  
  getModuleWithLessons: publicProcedure
    .input(getModuleInputSchema)
    .query(({ input }) => getModuleWithLessons(input)),
  
  updateModule: publicProcedure
    .input(updateModuleInputSchema)
    .mutation(({ input }) => updateModule(input)),
  
  deleteModule: publicProcedure
    .input(deleteModuleInputSchema)
    .mutation(({ input }) => deleteModule(input)),

  // Lesson routes
  createLesson: publicProcedure
    .input(createLessonInputSchema)
    .mutation(({ input }) => createLesson(input)),
  
  getLessons: publicProcedure
    .query(() => getLessons()),
  
  getLessonsByModule: publicProcedure
    .input(getLessonsByModuleInputSchema)
    .query(({ input }) => getLessonsByModule(input)),
  
  getLesson: publicProcedure
    .input(getLessonInputSchema)
    .query(({ input }) => getLesson(input)),
  
  updateLesson: publicProcedure
    .input(updateLessonInputSchema)
    .mutation(({ input }) => updateLesson(input)),
  
  deleteLesson: publicProcedure
    .input(deleteLessonInputSchema)
    .mutation(({ input }) => deleteLesson(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();