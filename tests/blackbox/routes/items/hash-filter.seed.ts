import vendors from '@common/get-dbs-to-test';
import {
	CreateCollection,
	CreateField,
	CreateFieldO2M,
	CreateItem,
	DeleteCollection,
	PRIMARY_KEY_TYPES,
} from '@common/index';
import { v4 as uuid } from 'uuid';

export const collectionFirst = 'test_items_hash_filter_first';
export const collectionSecond = 'test_items_hash_filter_second';

export type First = {
	id?: number | string;
	hash_field?: string;
};

export type Second = {
	id?: number | string;
	hash_field?: string;
	first_id?: number | string | null;
};

export const seedDBStructure = () => {
	it.each(vendors)(
		'%s',
		async (vendor) => {
			for (const pkType of PRIMARY_KEY_TYPES) {
				try {
					const localCollectionFirst = `${collectionFirst}_${pkType}`;
					const localCollectionSecond = `${collectionSecond}_${pkType}`;

					// Delete existing collections
					await DeleteCollection(vendor, { collection: localCollectionSecond });
					await DeleteCollection(vendor, { collection: localCollectionFirst });

					// Create first collection
					await CreateCollection(vendor, {
						collection: localCollectionFirst,
						primaryKeyType: pkType,
					});

					await CreateField(vendor, {
						collection: localCollectionFirst,
						field: 'hash_field',
						type: 'hash',
						meta: {
							special: ['hash'],
						},
					});

					// Create seconds collection
					await CreateCollection(vendor, {
						collection: localCollectionSecond,
						primaryKeyType: pkType,
					});

					await CreateField(vendor, {
						collection: localCollectionSecond,
						field: 'hash_field',
						type: 'hash',
						meta: {
							special: ['hash'],
						},
					});

					await CreateFieldO2M(vendor, {
						collection: localCollectionFirst,
						field: 'second_ids',
						primaryKeyType: pkType,
						otherCollection: localCollectionSecond,
						otherField: 'first_id',
					});

					expect(true).toBeTruthy();
				} catch (error) {
					expect(error).toBeFalsy();
				}
			}
		},
		300000
	);
};

export const seedDBValues = async () => {
	let isSeeded = true;

	await Promise.all(
		vendors.map(async (vendor) => {
			for (const pkType of PRIMARY_KEY_TYPES) {
				const localCollectionFirst = `${collectionFirst}_${pkType}`;

				// Create nested items with hash
				await CreateItem(vendor, {
					collection: localCollectionFirst,
					item: {
						id: pkType === 'string' ? uuid() : undefined,
						hash_field: uuid(),
						second_ids: [
							{
								id: pkType === 'string' ? uuid() : undefined,
								hash_field: uuid(),
							},
						],
					},
				});

				// Create nested items without hash
				await CreateItem(vendor, {
					collection: localCollectionFirst,
					item: {
						id: pkType === 'string' ? uuid() : undefined,
						second_ids: [
							{
								id: pkType === 'string' ? uuid() : undefined,
							},
						],
					},
				});
			}
		})
	)
		.then(() => {
			isSeeded = true;
		})
		.catch(() => {
			isSeeded = false;
		});

	return isSeeded;
};
