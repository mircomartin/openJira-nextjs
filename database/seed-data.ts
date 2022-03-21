
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
			description: 'Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, similique.',
			status: 'pending',
			createdAt: Date.now(),
		},
		{
			description: 'En Progreso: Lorem ipsum dolor sit amet.',
			status: 'in-progress',
			createdAt: Date.now(),
		},
		{
			description: 'Finalizada: adipisicing elit. Eveniet, similique.',
			status: 'finished',
			createdAt: Date.now(),
		}
    ]
}