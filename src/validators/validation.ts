import { z } from "zod";

export const SelectionSchema = z.object({
  city: z.string().min(1, "City is required"),
  vehicle: z.string().min(1, "Vehicle is required"),
});

export const ResultSchema = z.object({
  score: z.number().min(0, "Score cannot be negative"),
  timeTaken: z.number().min(0, "Time cannot be negative"),
  success: z.boolean(),
});

export const RequestBodySchema = z.object({
  userId: z.string().uuid("Invalid user ID format"),
  gameId: z.string().uuid("Invalid game ID format"),
  action: z.enum(["START", "PAUSE", "END"]),
});

export const EnvSchema = z.object({
  DATABASE_URL: z.string().url("Invalid database URL"),
  NEXT_PUBLIC_API_URL: z.string().url("Invalid API URL"),
});

export type SelectionType = z.infer<typeof SelectionSchema>;
export type ResultType = z.infer<typeof ResultSchema>;
export type RequestBodyType = z.infer<typeof RequestBodySchema>;
export type EnvType = z.infer<typeof EnvSchema>;

export const CreateCitySchema = z.object({
  name: z
    .string()
    .min(2, "City name must have at least 2 characters")
    .max(50, "City name cannot exceed 50 characters"),
  distance: z.number().min(1, "Distance is required"),
});

export type CreateCityType = z.infer<typeof CreateCitySchema>;

export const CitySchema = z.object({
  id: z.string().uuid("Invalid city ID format"),
  name: z.string().min(1, "City name is required"),
  distance: z.number(),
});

export const CitiesSchema = z.array(CitySchema);

export type CityType = z.infer<typeof CitySchema>;
export type CitiesType = z.infer<typeof CitiesSchema>;

export const CopSchema = z.object({
  id: z.string().uuid("Invalid Cop ID format"),
  name: z.string().min(1, "Cop name is required"),
  cityId: z.string().uuid("Invalid city ID format"),
  vehicleId: z.string().uuid("Invalid vehicle ID format"),
});

export const CopsSchema = z.array(CopSchema);

export const CopAssignmentSchema = z.object({
  name: z.string().min(1, "Cop name is required"),
  cityId: z.string().uuid("Invalid city ID format"),
  vehicleId: z.string().uuid("Invalid vehicle ID format"),
});

export type CopType = z.infer<typeof CopSchema>;
export type CopsType = z.infer<typeof CopsSchema>;
export type CopAssignmentType = z.infer<typeof CopAssignmentSchema>;

export const VehicleSchema = z.object({
  id: z.string().uuid("Invalid vehicle ID format"),
  name: z.string().min(1, "Vehicle name is required"),
  type: z.enum(["CAR", "BIKE", "TRUCK"]),
  capacity: z.number().min(1, "Capacity must be at least 1"),
});

export const VehiclesSchema = z.array(VehicleSchema);

export type VehicleType = z.infer<typeof VehicleSchema>;
export type VehiclesType = z.infer<typeof VehiclesSchema>;
