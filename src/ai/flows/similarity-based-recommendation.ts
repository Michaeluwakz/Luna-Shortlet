'use server';
/**
 * @fileOverview An AI agent that recommends similar apartments based on a given apartment's features.
 *
 * - recommendSimilarApartments - A function that recommends similar apartments.
 * - ApartmentFeaturesInput - The input type for the recommendSimilarApartments function.
 * - ApartmentRecommendationsOutput - The return type for the recommendSimilarApartments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ApartmentFeaturesInputSchema = z.object({
  location: z.string().describe('The location of the apartment.'),
  price: z.number().describe('The price of the apartment per night.'),
  numberOfGuests: z.number().describe('The number of guests the apartment can accommodate.'),
  amenities: z.array(z.string()).describe('A list of amenities offered by the apartment.'),
  description: z.string().describe('A detailed description of the apartment.'),
});
export type ApartmentFeaturesInput = z.infer<typeof ApartmentFeaturesInputSchema>;

const ApartmentRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      location: z.string().describe('The location of the recommended apartment.'),
      price: z.number().describe('The price of the recommended apartment per night.'),
      numberOfGuests: z.number().describe('The number of guests the recommended apartment can accommodate.'),
      amenities: z.array(z.string()).describe('A list of amenities offered by the recommended apartment.'),
      description: z.string().describe('A detailed description of the recommended apartment.'),
      similarityScore: z.number().describe('A score indicating the similarity to the input apartment, ranging from 0 to 1.'),
    })
  ).describe('A list of recommended apartments similar to the input apartment.'),
});
export type ApartmentRecommendationsOutput = z.infer<typeof ApartmentRecommendationsOutputSchema>;

export async function recommendSimilarApartments(input: ApartmentFeaturesInput): Promise<ApartmentRecommendationsOutput> {
  return recommendSimilarApartmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendSimilarApartmentsPrompt',
  input: {schema: ApartmentFeaturesInputSchema},
  output: {schema: ApartmentRecommendationsOutputSchema},
  prompt: `You are an expert recommendation system for shortlet apartments.

  Based on the features of the apartment the user is currently viewing, recommend other apartments that are similar.
  Consider location, price, number of guests, amenities, and description to determine similarity.
  Each recommendation should also include a similarity score (0 to 1) indicating how similar it is to the input apartment.

  Apartment Features:
  Location: {{{location}}}
  Price: {{{price}}}
  Number of Guests: {{{numberOfGuests}}}
  Amenities: {{#each amenities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Description: {{{description}}}

  Format your output as a JSON object that conforms to the ApartmentRecommendationsOutputSchema schema.
  `,
});

const recommendSimilarApartmentsFlow = ai.defineFlow(
  {
    name: 'recommendSimilarApartmentsFlow',
    inputSchema: ApartmentFeaturesInputSchema,
    outputSchema: ApartmentRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
