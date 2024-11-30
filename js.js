fetch("/process.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // 解析为 JSON 格式
  })
  .then((data) => {
    data.process.forEach((item) => {
      const {
        title,
        contract_date,
        seal_date,
        payment_pendding_date,
        plan_start_date,
        plan_end_date,
        real_start_date,
        real_end_date,
        estimate_start_date,
        estimate_end_date,
        actual_start_date,
        actual_end_date,
        release_date,
        stage,
      } = item;
      const template = `
        <div class="factory">${title}</div>
        <!-- start -->
        <div class="process-item">
          <div class="process-title">采购合同拟定</div>
          <div class="start-date">执行日期:${contract_date}</div>
        </div>
        <!-- -- -->
        <!-- start -->
        <div class="process-item">
          <div class="process-title">工厂盖章</div>
          <div class="start-date">执行日期:${seal_date}</div>
        </div>
        <!-- -- -->
        <!-- start -->
        <div class="process-item">
          <div class="process-title">寄出财务/等待预付款</div>
          <div class="start-date">执行日期:${payment_pendding_date}</div>
        </div>
        <!-- -- -->
        <!-- start -->
        <div class="process-item">
          <div class="process-title">备料阶段</div>
          <div class="start-date">计划开始日期:${plan_start_date}</div>
          <div class="start-date">预计结束日期:${plan_end_date}</div>
          <div class="end-date">实际开始日期:${real_start_date}</div>
          <div class="end-date">实际结束日期:${real_end_date}</div>
        </div>
        <!-- -- -->
        <!-- start -->
        <div class="process-item">
          <div class="process-title">正式投产</div>
          <div class="start-date">计划开始日期:${estimate_start_date}</div>
          <div class="start-date">预计结束日期:${estimate_end_date}</div>
          <div class="end-date">实际开始日期:${actual_start_date}</div>
          <div class="end-date">实际结束日期:${actual_end_date}</div>
        </div>
        <!-- -- -->
        <!-- start -->
        <div class="process-item">
          <div class="process-title">工厂出货</div>
          <div class="start-date">执行日期:${release_date}</div>
        </div>
        <!-- -- -->`;
      const process = document.createElement("div");
      process.classList.add("process");
      process.innerHTML = template;
      process.querySelectorAll(".process-item").forEach((item, idx) => {
        if (idx < stage - 1) {
          item.classList.add("excuted");
        }
        if (idx == stage - 1) {
          item.classList.add("active");
        }
      });
      const container = document.getElementById("process-container");
      container.appendChild(process);
    });
  });
