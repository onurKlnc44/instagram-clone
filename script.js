

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // Kayıt Formu
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("regUsername").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value;
      const password2 = document.getElementById("regPassword2").value;

      if (!username || !email || !password || !password2) {
        alert("Lütfen tüm alanları doldurun!");
        return;
      }

      if (password !== password2) {
        alert("Şifreler uyuşmuyor!");
        return;
      }

     
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        alert("Geçerli bir e-posta girin!");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const userExists = users.some(u => u.username === username || u.email === email);
      if (userExists) {
        alert("Bu kullanıcı adı veya e-posta zaten kayıtlı.");
        return;
      }

      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
      window.location.href = "index.html";
    });
  }

  // Giriş Formu
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;

      if (!username || !password) {
        alert("Lütfen kullanıcı adı ve şifrenizi girin.");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => (u.username === username || u.email === username) && u.password === password);

      if (user) {
        alert(`Hoş geldin, ${user.username}!`);
        // Burada gerçek projede token, yönlendirme vs. olur
      } else {
        alert("Kullanıcı adı veya şifre yanlış!");
      }
    });
  }
});
