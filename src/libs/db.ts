import { format } from 'date-fns';
import STORAGE from '~/utils/mmkv-storage';
import MMKV_KEYS from '~/constants/mmkv-keys';

export interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  hour: string;
  frequency: {
    times: number;
    repeat_every: string;
  };
  dateTimeNotification: Date;
}

export interface StoragePlantProps {
  [id: string]: {
    data: PlantProps;
    notificationId: string;
  };
}

export function savePlant(plant: PlantProps) {
  try {
    const nextTime = new Date(plant.dateTimeNotification);
    const now = new Date();

    const { times, repeat_every } = plant.frequency;

    if (repeat_every === 'week') {
      const interval = Math.trunc(7 / times);
      nextTime.setDate(now.getDate() + interval);
    } else {
      nextTime.setDate(nextTime.getDate() + 1);
    }

    // diferença em segundos de um tempo pro outro
    const seconds = Math.abs(
      Math.ceil((now.getTime() - nextTime.getTime()) / 1000),
    );

    const data = STORAGE.getString(MMKV_KEYS.PLANTS);
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
      },
    };

    STORAGE.set(
      MMKV_KEYS.PLANTS,
      JSON.stringify({
        ...newPlant,
        ...oldPlants,
      }),
    );
  } catch (error: any) {
    throw new Error(error);
  }
}

export function loadPlant(): PlantProps[] {
  try {
    const data = STORAGE.getString(MMKV_KEYS.PLANTS);
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const plantsSorted = Object.keys(plants)
      .map(plant => {
        return {
          ...plants[plant].data,
          hour: format(
            new Date(plants[plant].data.dateTimeNotification),
            'HH:mm',
          ),
        };
      })
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
          Math.floor(new Date(b.dateTimeNotification).getTime() / 1000),
        ),
      );

    return plantsSorted;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function removePlant(id: string) {
  const data = STORAGE.getString(MMKV_KEYS.PLANTS);
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

  delete plants[id];

  STORAGE.set(MMKV_KEYS.PLANTS, JSON.stringify(plants));
}
