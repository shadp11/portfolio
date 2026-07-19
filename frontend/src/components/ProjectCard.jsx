import { useState } from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";

const ProjectCard = ({ project }) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      <div className="group overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:border-sky-300/80 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-500/60">
        <div className="relative overflow-hidden">
          <div className="flex h-64 items-center justify-center bg-slate-100 dark:bg-slate-900">
            <img
              src={project.screenshots[0]}
              alt={`${project.title} screenshot`}
              className="max-h-full max-w-full cursor-pointer object-contain transition hover:scale-105"
              onClick={() => setShowImage(true)}
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 to-transparent p-4 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
              Featured project
            </p>

            <h3 className="mt-2 text-2xl font-bold">{project.title}</h3>

            {project.role && (
              <p className="mt-1 text-sm font-medium text-sky-200">
                {project.role}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4 p-6">
          <p className="text-slate-700 dark:text-slate-300">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-400">
            {project.features.map((feature) => (
              <p key={feature} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                {feature}
              </p>
            ))}
          </div>

          {project.repo && (
            <div className="mt-4">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                GitHub
                <DocumentTextIcon className="h-4 w-4" />
              </a>
            </div>
          )}

          {project.live && project.live !== "#" && (
            <div className="mt-4">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-sky-300 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-100 dark:border-sky-700 dark:bg-sky-950 dark:text-sky-300"
              >
                View Dashboard
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview */}
      {showImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 p-6"
            onClick={() => setShowImage(false)}
          >
            <img
              src={project.screenshots[0]}
              alt={project.title}
              className="max-h-screen max-w-screen-lg rounded-lg object-contain"
            />
          </div>,
          document.body,
        )}
    </>
  );
};

export default ProjectCard;
