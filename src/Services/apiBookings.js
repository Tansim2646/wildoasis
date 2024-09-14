import supabase from "./Supabase";
import { PAGE_SIZE } from "../Utils/config";
export async function getBookings({ status, sortBy, selectedPage }) {
  let query = supabase
    .from("bookings")
    .select("*,cabins(name),guests(fullName,email)", { count: "exact" });
  // 1. Status Filter
  if (status) query = query.eq(status.field, status.value);
  // 2. Sorting
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  // 3. Pagination
  console.log(selectedPage);
  if (selectedPage) {
    const from = (selectedPage - 1) * PAGE_SIZE;
    const to = selectedPage * PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    throw new Error("Bookings could not be loaded");
  }
  return { data, count };
}
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*,cabins(*),guests(*)")
    .eq("id", id);
  if (error) {
    throw new Error("Booking Could not be found");
  }
  return data;
}
// Updating Booking
export async function updateBooking(id, updates) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    throw new Error("Bookings could not be updated");
  }
  return data;
}

//Deleting Cabin
export async function deleteBooking(id) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) {
    throw new Error("Booking could not be deleted 😵‍💫");
  }
}
