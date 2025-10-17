const API_URL = import.meta.env.VITE_API_URL;

export const sendFeedback = async (feedback: string) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API_URL}/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ message: feedback }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Gửi feedback thất bại");

    return { success: true, message: data.message || "Feedback sent!" };
  } catch (error: any) {
    console.error("❌ Feedback error:", error);
    return { success: false, message: error.message };
  }
};
