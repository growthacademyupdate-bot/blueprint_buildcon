import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { Service } from '@/models/Service';
import { projects as fallbackProjects } from '@/data/projects';
import { services as fallbackServices } from '@/data/services';

export type PublicProject = {
  id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  image: string;
  scope: string[];
  details: { duration: string; area: string; completion: string };
};

export type PublicService = {
  id: string;
  title: string;
  description: string;
  iconName?: string;
  image: string;
};

export async function getPublicProjects(): Promise<PublicProject[]> {
  try {
    await connectToDatabase();
    const records = await Project.find({ status: 'published' }).sort({ createdAt: -1 }).lean();
    if (records.length) return records.map((project) => ({ id: String(project._id), title: project.title, location: project.location, category: project.category, description: project.description, image: project.images[0]?.url ?? fallbackProjects[0].image, scope: project.scope, details: { duration: project.duration, area: project.area, completion: project.completion } }));
  } catch { /* Static content keeps the public site available while MongoDB is unavailable. */ }
  return fallbackProjects;
}

export async function getPublicServices(): Promise<PublicService[]> {
  try {
    await connectToDatabase();
    const records = await Service.find().sort({ createdAt: -1 }).lean();
    if (records.length) return records.map((service) => ({ id: String(service._id), title: service.title, description: service.shortDescription || service.description, iconName: fallbackServices.find((item) => item.title === service.title)?.id ?? fallbackServices[0].id, image: service.image?.url ?? fallbackServices[0].image }));
  } catch { /* Static content keeps the public site available while MongoDB is unavailable. */ }

  return fallbackServices.map(({ icon, ...item }) => ({
    ...item,
    iconName: item.id,
    image: item.image,
  }));
}