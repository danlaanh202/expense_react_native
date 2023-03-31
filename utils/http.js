import axios from "axios";

const BE_URL =
  "https://react-native-3cd1d-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function storeExpense(expenseData) {
  const response = await axios.post(BE_URL + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  try {
    const response = await axios.get(BE_URL + "/expenses.json");
    // throw new Error();
    const expenses = [];

    for (let key in response.data) {
      const expenseObj = {
        id: key,

        amount: response.data[key].amount,

        date: new Date(response.data[key].date),

        description: response.data[key].description,
      };
      expenses.push(expenseObj);
    }
    return expenses;
  } catch (error) {
    throw new Error();
  }
}

export async function updateExpense(id, expenseData) {
  return await axios.put(BE_URL + `/expenses/${id}.json`, expenseData);
}
export function deleteExpense(id) {
  return axios.delete(BE_URL + `/expenses/${id}.json`);
}
