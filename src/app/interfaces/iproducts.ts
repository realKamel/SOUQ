import { IRating } from './irating';

export interface IProducts {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: IRating;
}
