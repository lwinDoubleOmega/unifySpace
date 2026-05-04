const termsModal = document.getElementById("termsModal");
    const accessDenied = document.getElementById("accessDenied");
    const agreeTermsBtn = document.getElementById("agreeTermsBtn");
    const denyTermsBtn = document.getElementById("denyTermsBtn");

    agreeTermsBtn?.addEventListener("click", () => {
      termsModal.style.display = "none";
    });

    denyTermsBtn?.addEventListener("click", () => {
      termsModal.style.display = "none";
      accessDenied.style.display = "grid";
    });

    const landingPage = document.getElementById("landingPage");
    const appScreen = document.getElementById("appScreen");
    const currentPlan = document.getElementById("currentPlan");
    const messages = document.getElementById("messages");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const channelTitle = document.getElementById("channelTitle");
    const channelDescription = document.getElementById("channelDescription");
    const aiBox = document.getElementById("aiBox");
    const meetingModal = document.getElementById("meetingModal");
    const cameraVideo = document.getElementById("cameraVideo");
    const videoBox = document.getElementById("videoBox");
    const meetingStatus = document.getElementById("meetingStatus");
    let cameraStream = null;

    const channelData = {
      general: {
        title: "# general",
        description: "Team communication, updates, and discussion.",
        messages: [
          ["Aye", "Today 9:00 AM", "Welcome everyone. Please share your project updates here."],
          ["Min", "Today 9:05 AM", "I finished the communication tool homepage and pricing section."],
          ["Nora", "Today 9:08 AM", "I uploaded the design prototype and logo ideas."],
          ["AI", "Today 9:10 AM", "Summary: Team is preparing homepage, design files, and presentation."],
        ]
      },
      announcements: {
        title: "# announcements",
        description: "Important team announcements.",
        messages: [
          ["Admin", "Yesterday", "Presentation rehearsal is scheduled for Friday."],
          ["Admin", "Today", "Please check your assigned tasks before the meeting."],
        ]
      },
      "it-team": {
        title: "# it-team",
        description: "Developer communication and technical updates.",
        messages: [
          ["Min", "Today", "I am working on the login page and chat JavaScript."],
          ["David", "Today", "We should add Firebase later for real database storage."],
        ]
      },
      business: {
        title: "# business",
        description: "Business model, pricing, and planning. Available in Team and Enterprise plans.",
        messages: [
          ["Aye", "Today", "Free plan is for basic chat. Pro plan includes AI and more storage."],
          ["Nora", "Today", "We can present competitors as future integration partners."],
        ]
      },
      design: {
        title: "# design",
        description: "UI, prototype, graphics, and brand discussion. Available in Team and Enterprise plans.",
        messages: [
          ["Nora", "Today", "The design should be clean, simple, and similar to modern collaboration apps."],
          ["Aye", "Today", "Please keep the interface easy for students and teams."],
        ]
      },
      admin: {
        title: "# admin-security",
        description: "Enterprise security, admin controls, and access logs.",
        messages: [
          ["Security Bot", "Today", "Role-based access control is enabled."],
          ["Admin", "Today", "Enterprise analytics and audit logs are available."],
        ]
      }
    };

    let activeChannel = "general";
    let selectedPlan = "Free";

    const planRules = {
      Free: {
        notice: "Free Plan: basic chat, basic calls, limited files, and small team spaces only.",
        features: ["Basic messaging", "Basic calls", "Limited storage", "Small team spaces"]
      },
      Pro: {
        notice: "Pro Plan: includes Free features plus AI summaries, more storage, and full communication tools.",
        features: ["More storage", "AI summaries", "Full communication", "Basic integrations"]
      },
      Team: {
        notice: "Team Plan: includes Pro features plus project spaces, business/design channels, team dashboard, and advanced history.",
        features: ["Project spaces", "Advanced history", "Team dashboard", "Higher AI usage"]
      },
      Enterprise: {
        notice: "Enterprise Plan: includes all features plus security center, admin controls, analytics, and custom integrations.",
        features: ["Advanced security", "Custom integrations", "Priority support", "Analytics"]
      }
    };

    function planLevel(plan) {
      return { Free: 1, Pro: 2, Team: 3, Enterprise: 4 }[plan] || 1;
    }

    function updatePlanAccess(plan) {
      selectedPlan = plan;
      const level = planLevel(plan);
      const notice = document.getElementById("planNotice");
      const featurePanel = document.getElementById("planFeaturePanel");
      const rules = planRules[plan];

      notice.textContent = rules.notice;
      featurePanel.innerHTML = `<strong>${plan} Plan Features</strong><ul>${rules.features.map(item => `<li>${item}</li>`).join("")}</ul>`;

      document.querySelectorAll(".plan-pro").forEach(el => el.classList.toggle("locked", level < 2));
      document.querySelectorAll(".plan-team").forEach(el => el.classList.toggle("locked", level < 3));
      document.querySelectorAll(".plan-enterprise").forEach(el => el.classList.toggle("locked", level < 4));
    }

    function openApp(plan = "Free") {
      currentPlan.textContent = plan + " Plan";

      // Show ONLY the dashboard and hide the landing page.
      // We use both class and style so it still works even if the browser caches old CSS.
      landingPage.classList.add("hidden");
      landingPage.style.display = "none";

      appScreen.classList.remove("hidden");
      appScreen.style.display = "block";

      activeChannel = "general";
      document.querySelectorAll(".channel-btn").forEach(b => b.classList.remove("active"));
      document.querySelector('[data-channel="general"]').classList.add("active");
      updatePlanAccess(plan);
      loadChannel(activeChannel);
      window.scrollTo(0, 0);
    }

    // Plan buttons are handled by roles/roles.js.
    // Flow: choose plan -> select role -> open the role dashboard.

    document.querySelectorAll(".open-app").forEach(btn => {
      btn.addEventListener("click", () => openApp("Free"));
    });

    document.getElementById("backHomeBtn").addEventListener("click", () => {
      appScreen.classList.add("hidden");
      appScreen.style.display = "none";

      landingPage.classList.remove("hidden");
      landingPage.style.display = "block";
      window.scrollTo(0, 0);
    });

    function loadChannel(channelName) {
      const channel = channelData[channelName];
      channelTitle.textContent = channel.title;
      channelDescription.textContent = channel.description;
      messages.innerHTML = "";
      channel.messages.forEach(msg => addMessage(msg[0], msg[1], msg[2], false));
      messages.scrollTop = messages.scrollHeight;
    }

    function addMessage(name, time, text, save = true) {
      const div = document.createElement("div");
      div.className = "message";
      div.innerHTML = `
        <div class="avatar">${name.charAt(0)}</div>
        <div class="message-body">
          <div class="message-top"><strong>${name}</strong><span>${time}</span></div>
          <div class="message-text"></div>
        </div>
      `;
      div.querySelector(".message-text").textContent = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;

      if (save) {
        channelData[activeChannel].messages.push([name, "Now", text]);
      }
    }

    function sendMessage() {
      const text = messageInput.value.trim();
      if (!text) return;
      addMessage("You", "Now", text);
      messageInput.value = "";

      setTimeout(() => {
        addMessage("AI", "Now", "Thanks. I noted this update for the team summary.");
      }, 500);
    }

    sendBtn.addEventListener("click", sendMessage);
    messageInput.addEventListener("keydown", e => {
      if (e.key === "Enter") sendMessage();
    });

    document.querySelectorAll(".channel-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("locked")) {
          alert("This channel is not included in your current plan.");
          return;
        }
        document.querySelectorAll(".channel-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeChannel = btn.dataset.channel;
        loadChannel(activeChannel);
      });
    });

    document.getElementById("aiSummaryBtn").addEventListener("click", () => {
      if (planLevel(selectedPlan) < 2) {
        alert("AI Summary is available in Pro, Team, and Enterprise plans.");
        return;
      }
      aiBox.innerHTML = `
        <strong>🤖 AI Summary</strong>
        Current channel: ${channelData[activeChannel].title}<br><br>
        Main updates: team is discussing project progress, files, design, tasks, and communication features.<br><br>
        Suggested next task: prepare presentation slides and test the chat demo.
      `;
      addMessage("AI", "Now", "I generated a project summary and suggested the next task.");
    });

    async function openMeeting() {
      meetingModal.classList.add("active");
      meetingStatus.textContent = "Starting camera... Please allow camera permission.";

      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          meetingStatus.textContent = "Camera is not supported in this browser. Try Chrome or Edge.";
          return;
        }

        cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        cameraVideo.srcObject = cameraStream;
        videoBox.classList.add("camera-on");
        meetingStatus.textContent = "Camera is on. This is your live meeting preview.";
      } catch (error) {
        meetingStatus.textContent = "Camera permission was blocked or no camera was found.";
      }
    }

    function closeMeeting() {
      meetingModal.classList.remove("active");
      videoBox.classList.remove("camera-on");
      meetingStatus.textContent = "Click allow when your browser asks for camera permission.";

      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
      }
      cameraVideo.srcObject = null;
    }

    document.getElementById("meetingBtn").addEventListener("click", openMeeting);
    document.getElementById("meetingBtn2").addEventListener("click", openMeeting);
    document.getElementById("closeMeetingBtn").addEventListener("click", closeMeeting);

    document.getElementById("notifyBtn").addEventListener("click", () => {
      alert("Notification: You have a new team update!");
    });

    document.getElementById("uploadBtn").addEventListener("click", () => {
      const maxFiles = { Free: 1, Pro: 3, Team: 5, Enterprise: 10 }[selectedPlan];
      const currentFiles = document.querySelectorAll("#fileList .file-card:not(.locked)").length;
      if (currentFiles >= maxFiles) {
        alert(`${selectedPlan} Plan storage limit reached in this demo. Upgrade for more storage.`);
        return;
      }
      const fileName = prompt("Enter a demo file name to share:", "Project_File.pdf");
      if (!fileName) return;
      const fileList = document.getElementById("fileList");
      const div = document.createElement("div");
      div.className = "file-card";
      div.innerHTML = `<strong></strong><span>Uploaded just now</span>`;
      div.querySelector("strong").textContent = fileName;
      fileList.prepend(div);
      addMessage("You", "Now", "Uploaded file: " + fileName);
    });

    document.getElementById("addTaskBtn").addEventListener("click", () => {
      if (planLevel(selectedPlan) < 3 && document.querySelectorAll("#taskList .task-card").length >= 3) {
        alert("More task tracking is available in the Team and Enterprise plans.");
        return;
      }
      const task = prompt("Enter new task:", "Review communication tool demo");
      if (!task) return;
      const label = document.createElement("label");
      label.className = "task-card";
      label.innerHTML = `<input type="checkbox" /> ${task}<span>New</span>`;
      document.getElementById("taskList").prepend(label);
    });

    document.getElementById("taskList").addEventListener("change", e => {
      if (e.target.type === "checkbox") {
        e.target.closest(".task-card").classList.toggle("done", e.target.checked);
      }
    });

    document.getElementById("securityBtn").addEventListener("click", () => {
      if (planLevel(selectedPlan) < 4) {
        alert("Security Center is only available in the Enterprise plan.");
        return;
      }
      alert("Security Center: role access, encryption status, and audit logs are enabled.");
    });

    document.getElementById("analyticsBtn").addEventListener("click", () => {
      if (planLevel(selectedPlan) < 4) {
        alert("Analytics is only available in the Enterprise plan.");
        return;
      }
      alert("Analytics: team productivity, meeting activity, and file usage dashboard.");
    });

    document.getElementById("searchInput").addEventListener("input", e => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll(".member-card, .file-card").forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(query) ? "block" : "none";
      });
    });
