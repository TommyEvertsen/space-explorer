export default interface NeoInterface {
  near_earth_objects: {
    [date: string]: {
      id: string;
      neo_reference_id: string;
      name: string;
      nasa_jpl_url: string;
      estimated_diameter: {
        kilometers: {
          estimated_diameter_min: number;
          estimated_diameter_max: number;
        };
      };
      is_potentially_hazardous_asteroid: boolean;
      close_approach_data: {
        close_approach_date: string;
        close_approach_date_full: string;
        relative_velocity: {
          kilometers_per_hour: string;
        };
        miss_distance: {
          astronomical: string;
          kilometers: string;
        };
        orbiting_body: string;
      }[];
      is_sentry_object: boolean;
    }[];
  };
}
