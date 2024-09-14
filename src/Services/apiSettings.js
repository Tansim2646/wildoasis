import supabase from "../Services/Supabase";
export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();
  if (error) {
    throw new Error("An error occured while fetching settings");
  }
  return data;
}
export async function updateSettings(newSettings) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSettings)
    .eq("id", 1)
    .single();
  if (error) {
    throw new Error("An error occured while updating settings");
  }
  return data;
}
