import supabase from "./Supabase";
import { PAGE_SIZE } from "../Utils/config";
import { getToday } from "../Utils/helpers";
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
// Get Bookings after date
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at,totalPrice,extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));
  if (error) {
    console.log(error);
    throw new Error("Bookings after a particular date can't be fetched");
  }
  return data;
}
// Returns all stays that were created after a given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*,guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday({ end: true }));
  if (error) {
    throw new Error("Stays after a particular date can't be fetched");
  }
  return data;
}
// Get all todays actitivity
// There are two types of today's activity
// 1) status = unconfirmed and start date = today ; they are supposed to check in today
// 2 status = checked-in and end date = today ; they are supposed to check out today
export async function getTodaysActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*,guests(fullName,nationality,countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");
  if (error) {
    throw new Error("TOday's activity can't be fetched");
  }
  return data;
}
