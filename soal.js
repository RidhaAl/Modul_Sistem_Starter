// Tampilkan/sembunyikan tombol saat scroll
window.addEventListener('scroll', function() {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  if (window.scrollY > 300) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});

// Kembali ke atas saat tombol diklik
document.getElementById('scrollToTopBtn').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Efek scroll halus
  });
});

const questions = [
  {
    question: "Apa fungsi utama sistem starter pada kendaraan?",
    options: [
      "Mengisi daya aki",
      "Menghidupkan mesin kendaraan",
      "Mengatur sistem pengapian",
      "Mendinginkan mesin"
    ],
    answer: 1
  },
  {
    question: "Komponen berikut ini termasuk bagian dari motor starter, kecuali:",
    options: [
      "Armature",
      "Field Coil",
      "Komutator",
      "Radiator"
    ],
    answer: 3
  },
  {
    question: "Komponen yang berfungsi sebagai penghubung arus utama dari baterai ke motor starter adalah:",
    options: [
      "Brush",
      "Relay starter",
      "Magnetic switch",
      "Field Coil"
    ],
    answer: 2
  },
  {
    question: `
      Perhatikan gambar di bawah ini! Komponen apakah yang ditunjukkan?<br>
      <img src="isikonten/startermesin.png" alt="Gambar Sistem Starter" style="max-width:100%; margin-top:10px;" />
    `,
    options: [
      "Brush",
      "Gigi Pinion",
      "Field Coil",
      "Armature"
    ],
    answer: 1
  },
  {
    question: `
      Simak video berikut ini tentang pemeriksaan sistem starter. Apa fungsi pull-in coil?<br>
      <video controls width="100%" style="margin-top: 10px;">
        <source src="media/pemeriksaan-pull-in-coil.mp4" type="video/mp4">
        Browser Anda tidak mendukung tag video.
      </video>
    `,
    options: [
      "Mengembalikan plunyer ke posisi awal",
      "Menarik plunyer ke dalam untuk menghubungkan pinion",
      "Menyuplai daya ke lampu indikator",
      "Mengatur pengisian alternator"
    ],
    answer: 1
  }
];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const quizContainer = document.getElementById('quiz-container');

function renderQuestions() {
  quizContainer.innerHTML = '';
  const shuffledQuestions = shuffle([...questions]);

  shuffledQuestions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('p');
    questionText.innerHTML = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options');

    q.options.forEach((option, optIndex) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question${index}`;
      input.value = optIndex;
      label.appendChild(input);
      label.append(option);
      optionsDiv.appendChild(label);
    });

    questionDiv.appendChild(optionsDiv);
    quizContainer.appendChild(questionDiv);
  });

  window.currentQuestions = shuffledQuestions;
}

renderQuestions();

document.getElementById('submit-btn').addEventListener('click', () => {
  let score = 0;
  const resultDiv = document.getElementById('result');
  const questionDivs = document.querySelectorAll('.question');
  const shuffledQuestions = window.currentQuestions;

  questionDivs.forEach((qDiv, index) => {
    const selected = qDiv.querySelector('input[type="radio"]:checked');
    const optionsLabels = qDiv.querySelectorAll('label');
    const correctIndex = shuffledQuestions[index].answer;
    const radios = qDiv.querySelectorAll('input[type="radio"]');

    radios.forEach(r => r.disabled = true);

    if (selected) {
      const selectedIndex = parseInt(selected.value);
      optionsLabels.forEach((label, i) => {
        label.classList.remove('correct', 'incorrect');
        if (i === correctIndex) {
          label.classList.add('correct');
        } else if (i === selectedIndex) {
          label.classList.add('incorrect');
        }
      });
      if (selectedIndex === correctIndex) {
        score++;
      }
    } else {
      optionsLabels.forEach((label, i) => {
        label.classList.remove('correct', 'incorrect');
        if (i === correctIndex) {
          label.classList.add('correct');
        }
      });
    }
  });

  resultDiv.textContent = `Skor Anda: ${score} dari ${shuffledQuestions.length}`;
  document.getElementById('reset-btn').style.display = 'inline-block';
});

document.getElementById('reset-btn').addEventListener('click', () => {
  document.getElementById('result').textContent = '';
  document.getElementById('reset-btn').style.display = 'none';
  renderQuestions();
});
