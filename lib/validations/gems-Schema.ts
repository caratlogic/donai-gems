import { z } from "zod";

export const gemSchema = z.object({
    _id: z.string(),
    stockId: z.string().min(1, "Stock ID is required"),
    productType: z.enum(["GEM", "Gem", "Jewelry", "jewelry"]),
    category: z.enum([
        "Necklace",
        "Ring",
        "bracelet",
        "earrings",
        "loose stone",
        "ring",
    ]),
    stoneType: z.string().min(1, "Stone type is required"),
    color: z.enum([
        "Light Bleu",
        "Orange Pink",
        "bleu",
        "bluish green",
        "green",
        "orange",
        "purple",
        "red",
        "royal Bleu",
        "royal blue",
        "violetish bleu",
        "vivid green",
    ]),
    shape: z.enum([
        "Oval",
        "antique cushion",
        "cushion",
        "heart shape",
        "octagonal",
        "oval",
        "pear shape",
        "rectangular",
    ]),
    carat: z.number().min(2).max(153.47),
    origin: z.string().min(1, "Origin is required"),
    treatment: z.enum([
        "CE(O) MINOR",
        "heated",
        "indication of heating (TE)",
        "may be",
        "no heat",
        "no indication",
        "treated to change the color",
    ]),
    availability: z.boolean(),
    certificate: z.enum(["GIA", "GRS", "GUBELIN", "SSEF"]),
    measurement: z.string().min(1, "Measurement is required"),
    createdAt: z.string().datetime().or(z.date()),
    updatedAt: z.string().datetime().or(z.date()),
    __v: z.number().optional(),
});

export const gemsArraySchema = z.array(gemSchema);

export type Gem = z.infer<typeof gemSchema>;
export type GemsArray = z.infer<typeof gemsArraySchema>;

// Schema for creating a new gem (without _id, createdAt, updatedAt, __v)
export const createGemSchema = gemSchema.omit({
    _id: true,
    createdAt: true,
    updatedAt: true,
    __v: true,
});

export type CreateGem = z.infer<typeof createGemSchema>;

// Schema for updating a gem (all fields optional except _id)
export const updateGemSchema = gemSchema.partial().extend({
    _id: z.string(),
});

export type UpdateGem = z.infer<typeof updateGemSchema>;
