import supabase, { supabaseUrl } from "./Supabase";

export async function Login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error("Email and Password do not match");
  }
  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error("User not found");
  return data?.user;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Logout failed");
}
export async function signup({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullName: fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function updateUser({ password, fullName, avatar }) {
  // 1.Update the password or full name
  let updateValue;
  if (password) updateValue = { password };
  if (fullName) updateValue = { data: { fullName } };
  const { data, error: perror } = await supabase.auth.updateUser(updateValue);
  if (perror) throw new Error("Password or Full Name not updated");
  // Creating the avatars name
  if (avatar) {
    const avatarName = `avatar-${data.user.id}-${Math.random() * 10}`;
    const { error } = await supabase.storage
      .from("avatar")
      .upload(avatarName, avatar);
    if (error) throw new Error(error.message);
    // Update the location of the avatar image in fullName
    const { data: finalData, error: AvatarPathUpdateError } =
      await supabase.auth.updateUser({
        data: {
          avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${avatarName}`,
        },
      });
    if (AvatarPathUpdateError) {
      throw new Error(AvatarPathUpdateError.message);
    }
    return finalData;
  }
  return data;
}
