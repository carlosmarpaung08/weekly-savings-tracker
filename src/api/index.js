const API_URL = import.meta.env.VITE_API_URL;

// ============================================================
// HELPER
// ============================================================
async function getRequest(action, params = {}) {
  const query = new URLSearchParams({ action, ...params }).toString();
  const res   = await fetch(`${API_URL}?${query}`);
  return res.json();
}

async function postRequest(body, token = null) {
  const url = token ? `${API_URL}?token=${token}` : API_URL;
  const res = await fetch(url, {
    method: "POST",
    body:   JSON.stringify(body),
  });
  return res.json();
}

// ============================================================
// AUTH
// ============================================================
export async function login(password) {
  return postRequest({ action: "login", password });
}

// ============================================================
// DASHBOARD
// ============================================================
export async function getDashboard() {
  return getRequest("getDashboard");
}

// ============================================================
// MEMBERS
// ============================================================
export async function getMembers() {
  return getRequest("getMembers");
}

export async function createMember(name, token) {
  return postRequest({ action: "createMember", name }, token);
}

export async function updateMember(member_id, name, token) {
  return postRequest({ action: "updateMember", member_id, name }, token);
}

export async function deleteMember(member_id, token) {
  return postRequest({ action: "deleteMember", member_id }, token);
}

// ============================================================
// WEEKS
// ============================================================
export async function getWeeks() {
  return getRequest("getWeeks");
}

export async function getActiveWeek() {
  return getRequest("getActiveWeek");
}

export async function getWeekDetail(week_id) {
  return getRequest("getWeekDetail", { week_id });
}

export async function createWeek(amount, token) {
  return postRequest({ action: "createWeek", amount }, token);
}

export async function updateWeekAmount(week_id, amount, token) {
  return postRequest({ action: "updateWeekAmount", week_id, amount }, token);
}

// ============================================================
// PAYMENTS
// ============================================================
export async function togglePayment(payment_id, is_paid, token, member_id = null, week_id = null) {
  return postRequest({ action: "togglePayment", payment_id, is_paid, member_id, week_id }, token);
}