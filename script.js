document.addEventListener('DOMContentLoaded', () => {
    // Array de perguntas (o mesmo que você enviou)
    const questions = [
        { question: "Em 2 Tessalonicenses 1, Paulo elogia a igreja principalmente por:", answers: [{ text: "Sua riqueza crescente", correct: false }, { text: "Sua fé e amor que continuam aumentando", correct: true }, { text: "Sua capacidade de realizar milagres", correct: false }, { text: "Sua obediência às tradições judaicas", correct: false }] },
        { question: "Em 2 Tessalonicenses 2, Paulo afirma que a volta de Cristo só ocorrerá depois de qual evento?", answers: [{ text: "A construção do terceiro templo", correct: false }, { text: "A grande fome sobre Israel", correct: false }, { text: "A apostasia e a manifestação do homem da iniquidade", correct: true }, { text: "A conversão das nações", correct: false }] },
        { question: "Segundo 2 Tessalonicenses 3, o que Paulo ordena em relação aos que vivem ociosos?", answers: [{ text: "Que sejam expulsos da igreja", correct: false }, { text: "Que sejam punidos publicamente", correct: false }, { text: "Que trabalhem e comam do próprio esforço", correct: true }, { text: "Que recebam ajuda dobrada até se reerguerem", correct: false }] },
        { question: "Em 1 Timóteo 1, Paulo lembra Timóteo sobre qual responsabilidade?", answers: [{ text: "Proibir casamentos mistos", correct: false }, { text: "Combater falsos ensinadores e doutrinas estranhas", correct: true }, { text: "Ensinar apenas judeus", correct: false }, { text: "Evitar discutir sobre a volta de Cristo", correct: false }] },
        { question: "Em 1 Timóteo 2, Paulo orienta que se façam orações por quem?", answers: [{ text: "Somente pelo povo de Deus", correct: false }, { text: "Pelos perseguidos", correct: false }, { text: "Por todos os homens, inclusive reis e autoridades", correct: true }, { text: "Apenas pelos líderes espirituais", correct: false }] },
        { question: "Em 1 Timóteo 3, quais grupos têm seus requisitos detalhados?", answers: [{ text: "Profetas e evangelistas", correct: false }, { text: "Sacerdotes e levitas", correct: false }, { text: "Bispos e diáconos", correct: true }, { text: "Apóstolos e missionários", correct: false }] },
        { question: "Em 1 Timóteo 4, Paulo alerta que nos últimos tempos alguns se desviarão da fé por causa:", answers: [{ text: "Da falta de recursos", correct: false }, { text: "De doutrinas de demônios", correct: true }, { text: "De perseguições políticas", correct: false }, { text: "De falhas na liderança", correct: false }] },
        { question: "Em 1 Timóteo 5, Paulo orienta que as viúvas verdadeiramente necessitadas devem ser:", answers: [{ text: "Enviadas para Jerusalém", correct: false }, { text: "Sustentadas pela igreja", correct: true }, { text: "Afastadas da congregação", correct: false }, { text: "Obrigadas a se casar novamente", correct: false }] },
        { question: "Em 1 Timóteo 6, Paulo afirma que “a raiz de todos os males” é:", answers: [{ text: "A idolatria", correct: false }, { text: "A mentira", correct: false }, { text: "O amor ao dinheiro", correct: true }, { text: "A injustiça", correct: false }] },
        { question: "Em 2 Timóteo 1, Paulo encoraja Timóteo a reavivar o quê?", answers: [{ text: "A esperança na volta de Cristo", correct: false }, { text: "O dom de Deus que estava nele", correct: true }, { text: "Sua habilidade de ensinar judeus", correct: false }, { text: "A leitura dos profetas maiores", correct: false }] },
        { question: "Em 2 Timóteo 2, Paulo compara o servo de Deus a várias figuras. Uma delas é:", answers: [{ text: "Um sacerdote do templo", correct: false }, { text: "Um navegador experiente", correct: false }, { text: "Um atleta que compete segundo as regras", correct: true }, { text: "Um médico que cura enfermos", correct: false }] },
        { question: "Em 2 Timóteo 2, Paulo diz que o servo do Senhor não deve brigar, mas sim:", answers: [{ text: "Impor a doutrina com firmeza", correct: false }, { text: "Ser gentil, apto para ensinar e paciente", correct: true }, { text: "Evitar todos os incrédulos", correct: false }, { text: "Debater publicamente para convencer", correct: false }] },
        { question: "Em 2 Timóteo 3, Paulo descreve os últimos dias como:", answers: [{ text: "De grande paz e conversões em massa", correct: false }, { text: "De tempos trabalhosos e difíceis", correct: true }, { text: "De calmaria espiritual", correct: false }, { text: "De prosperidade para a igreja", correct: false }] },
        { question: "Segundo 2 Timóteo 3, as Escrituras são úteis para quê?", answers: [{ text: "Elevar o status cultural do cristão", correct: false }, { text: "Criar tradições religiosas", correct: false }, { text: "Ensinar, repreender, corrigir e instruir na justiça", correct: true }, { text: "Definir regras de política da igreja", correct: false }] },
        { question: "Em 2 Timóteo 4, Paulo declara ter combatido o bom combate e ter:", answers: [{ text: "Convertido todas as nações", correct: false }, { text: "Cumprido todas as profecias", correct: false }, { text: "Guardado a fé e terminado a carreira", correct: true }, { text: "Realizado todos os milagres prometidos", correct: false }] }
    ];

    // --- MUDANÇA IMPORTANTE ---
    // Declara a variável 'database' aqui, mas não a inicializa ainda.
    let database;

    // Tenta inicializar o database. Se falhar (ex: chaves não configuradas),
    // o 'catch' evita que o script quebre.
    try {
        database = firebase.database();
    } catch (e) {
        console.error("Firebase não pôde ser inicializado. Verifique a configuração no index.html:", e);
    }
    // --- FIM DA MUDANÇA ---

    const loginScreen = document.getElementById('login-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');

    const playerNameInput = document.getElementById('player-name');
    const startButton = document.getElementById('start-btn');

    const questionTextElement = document.getElementById('question-text');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const questionCounter = document.getElementById('question-counter');

    const finalScoreText = document.getElementById('final-score-text');
    const rankingList = document.getElementById('ranking-list');
    const restartButton = document.getElementById('restart-btn');
    const loadingRankingText = document.getElementById('loading-ranking');

    let currentQuestionIndex = 0;
    let score = 0;
    let currentPlayer = '';

    // Este código agora vai funcionar, pois o script não quebrou antes
    startButton.addEventListener('click', () => {
        currentPlayer = playerNameInput.value.trim();
        if (currentPlayer) {
            localStorage.setItem('gincanaPlayerName', currentPlayer); // Salva localmente para persistir
            loginScreen.classList.add('hidden');
            quizScreen.classList.remove('hidden');
            startQuiz();
        } else {
            alert('Por favor, digite seu nome para começar!');
        }
    });

    function startQuiz() {
        resultsScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Próxima";
        showQuestion();
    }

    function showQuestion() {
        resetState();
        const currentQuestion = questions[currentQuestionIndex];
        questionCounter.innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
        progressBar.style.width = `${((currentQuestionIndex) / questions.length) * 100}%`;
        questionTextElement.innerText = currentQuestion.question;
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) button.dataset.correct = answer.correct;
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        nextButton.style.display = 'none';
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === 'true';

        if (isCorrect) {
            selectedBtn.classList.add('correct');
            score++;
        } else {
            selectedBtn.classList.add('incorrect');
        }

        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.dataset.correct === 'true') button.classList.add('correct');
            button.disabled = true;
        });

        if (questions.length > currentQuestionIndex + 1) {
            nextButton.style.display = 'block';
        } else {
            nextButton.innerText = 'Ver Ranking';
            nextButton.style.display = 'block';
        }
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    nextButton.addEventListener('click', handleNextButton);
    restartButton.addEventListener('click', startQuiz);

    function showResults() {
        quizScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        finalScoreText.innerText = `Sua Pontuação: ${score} de ${questions.length}`;
        updateAndDisplayRanking();
    }

    // --- MUDANÇA IMPORTANTE ---
    // A lógica do ranking agora verifica se o 'database' existe antes de usá-lo.
    function updateAndDisplayRanking() {
        loadingRankingText.style.display = 'block';
        rankingList.innerHTML = '';

        // Se o 'database' não foi inicializado com sucesso, exibe um aviso e para.
        if (!database) {
            loadingRankingText.innerText = 'Ranking indisponível. (Verifique a configuração do Firebase)';
            return;
        }

        const playerRef = database.ref('rankings/' + currentPlayer);

        // Primeiro, verifica se o jogador já tem uma pontuação e só atualiza se a nova for maior
        playerRef.once('value', (snapshot) => {
            const existingScore = snapshot.val() ? snapshot.val().score : 0;
            if (score > existingScore) {
                playerRef.set({ name: currentPlayer, score: score });
            }
        });

        // Agora, busca o ranking completo para exibir
        const rankingsRef = database.ref('rankings').orderByChild('score').limitToLast(10); // Pega os 10 melhores
        rankingsRef.once('value', (snapshot) => {
            loadingRankingText.style.display = 'none';
            const rankings = [];
            snapshot.forEach(childSnapshot => {
                rankings.push(childSnapshot.val());
            });

            // Inverte para mostrar a maior pontuação primeiro
            rankings.reverse();

            rankings.forEach(entry => {
                const li = document.createElement('li');
                li.innerHTML = `${entry.name} <span class="rank-score">${entry.score} Pontos</span>`;
                if (entry.name === currentPlayer) {
                    li.classList.add('current-player');
                }
                rankingList.appendChild(li);
            });
        });
    }
    // --- FIM DA MUDANÇA ---

    // Tenta recuperar o nome do jogador se ele já jogou antes
    const savedPlayerName = localStorage.getItem('gincanaPlayerName');
    if (savedPlayerName) {
        playerNameInput.value = savedPlayerName;
    }
});