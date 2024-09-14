/*
  THESE FILE CONTAINS ALL THE CABIN RELATED API
*/
/*
      MANY TIMES WE DONT GET THE DATA OF INSERTED DOCUMENT INSTANTLY. THATS WHY WE NEED TO USE SELECT() FUCTION AFTER INSERTING THE DATA
*/
import supabase, { supabaseUrl } from "./Supabase";
export async function getAllCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Cabins can not be fetched" + error.message);
  }
  return { data, error };
}
// Cabin Creation
export async function createEditCabin(info) {
  const { data, cabinId } = info;
  const hasImagePath = data.image?.startsWith?.(supabaseUrl);
  const imageName = `${Date.now()}-${data.image.name}`.replaceAll("/", " ");
  const imagePath = hasImagePath
    ? data.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins");
  if (!cabinId) {
    query = query.insert([{ ...data, image: imagePath }]);
  } else {
    query = query.update({ ...data, image: imagePath }).eq("id", cabinId);
  }
  const { data: cabinData, error: cabinError } = await query;
  if (cabinError) {
    throw new Error("Cabin can not be created or updated");
  }
  if (hasImagePath) {
    return cabinData;
  }
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, data.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", cabinData.id);
    throw new Error(
      "Cabin photo couldn't uploaded properly and cabin is deleted"
    );
  }
}
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabin could not be deleted 😵‍💫");
  }
}
