import AxiosInstance from './AxiosInstance';

type ProfileApiType = {
  gender: string; // Adjust based on possible values
  height: string; // Assuming height is a string like "180" (in cm)
  skinTone: string; // Adjust based on possible values
  skinUndertone: string; // Adjust based on possible values
  age: string; // Assuming age is a string like "25"
  brandsDealIn: string; // Adjust based on possible values
  mostlyStrugglesWith: string[]; // Array of strings for categories like "Wedding", "Parties", etc.
  profession: string;
  bodyShape: string; // Adjust based on possible values
  bodyType: string; // Adjust based on possible values
};

export const ProfileApi = async (payload: ProfileApiType) => {
  console.log(payload, 'payload');

  try {
    console.log('profile api called : ',payload);
    const response = await AxiosInstance.put('users/update/profile', payload); // ✅ Pass payload here
    console.log(response.data, 'response of update profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};
