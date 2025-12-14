// Создание декоративных частиц
const decoration = document.getElementById('decoration');

function createParticles() {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Случайный размер и позиция
        const size = Math.random() * 100 + 50;
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 15;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.top = '100vh';
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        decoration.appendChild(particle);
    }
}

createParticles();

// Мобильное меню
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Навигация между страницами
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Закрываем мобильное меню если оно открыто
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        const pageId = link.getAttribute('data-page');
        
        // Убираем активный класс у всех ссылок и страниц
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        // Добавляем активный класс к текущей ссылке и странице
        link.classList.add('active');
        document.getElementById(`${pageId}-page`).classList.add('active');
        
        // Прокрутка к началу страницы
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Запускаем анимации для текущей страницы
        setTimeout(() => {
            initPageAnimations(pageId);
        }, 300);
    });
});

// Инициализация анимаций для страницы
function initPageAnimations(pageId) {
    // Общие анимации для всех страниц
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Специальные анимации для разных элементов
                if (entry.target.classList.contains('course-description') || 
                    entry.target.classList.contains('advantages') || 
                    entry.target.classList.contains('goals') ||
                    entry.target.classList.contains('course-section') ||
                    entry.target.classList.contains('advantages-section') ||
                    entry.target.classList.contains('games-section') ||
                    entry.target.classList.contains('getting-started') ||
                    entry.target.classList.contains('comparison-section') ||
                    entry.target.classList.contains('unreal-hero') ||
                    entry.target.classList.contains('info-section') ||
                    entry.target.classList.contains('blueprints-section') ||
                    entry.target.classList.contains('teacher-card') ||
                    entry.target.classList.contains('why-teachers') ||
                    entry.target.classList.contains('contact-info') ||
                    entry.target.classList.contains('contact-form') ||
                    entry.target.classList.contains('social-section') ||
                    entry.target.classList.contains('map-section') ||
                    entry.target.classList.contains('faq-section')) {
                    
                    // Анимация для карточек внутри
                    setTimeout(() => {
                        if (entry.target.id === 'advantagesSection' || entry.target.classList.contains('advantages-section')) {
                            const cards = entry.target.querySelectorAll('.advantage-card');
                            cards.forEach((card, index) => {
                                setTimeout(() => {
                                    card.style.transform = 'translateY(-20px)';
                                    setTimeout(() => {
                                        card.style.transform = '';
                                    }, 500);
                                }, index * 150);
                            });
                        }
                        
                        if (entry.target.id === 'gamesSection' || entry.target.classList.contains('games-section')) {
                            const cards = entry.target.querySelectorAll('.game-card');
                            cards.forEach((card, index) => {
                                setTimeout(() => {
                                    card.style.transform = 'translateY(-15px) rotate(5deg)';
                                    setTimeout(() => {
                                        card.style.transform = '';
                                    }, 600);
                                }, index * 200);
                            });
                        }
                        
                        if (entry.target.classList.contains('teacher-card')) {
                            const experienceFill = entry.target.querySelector('.experience-fill');
                            if (experienceFill) {
                                const width = experienceFill.getAttribute('data-width') || '0';
                                setTimeout(() => {
                                    experienceFill.style.width = `${width}%`;
                                }, 300);
                            }
                        }
                    }, 300);
                }
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами текущей страницы
    const currentPage = document.getElementById(`${pageId}-page`);
    const elementsToObserve = currentPage.querySelectorAll('.course-description, .advantages, .goals, .course-section, .unity-description, .unity-visual, .advantages-section, .games-section, .getting-started, .comparison-section, .unreal-hero, .info-section, .blueprints-section, .teacher-card, .why-teachers, .contact-info, .contact-form, .social-section, .map-section, .faq-section');
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
    
    // Специальные анимации для конкретных страниц
    if (pageId === 'main') {
        initMainPage();
    } else if (pageId === 'about') {
        initAboutPage();
    } else if (pageId === 'unity') {
        initUnityPage();
    } else if (pageId === 'unreal') {
        initUnrealPage();
    } else if (pageId === 'teachers') {
        initTeachersPage();
    } else if (pageId === 'contacts') {
        initContactsPage();
    }
}

// Инициализация главной страницы
function initMainPage() {
    // Анимация для кнопки записи
    const ctaButton = document.getElementById('main-cta');
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSignupModal('Главная страница');
    });

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Инициализация страницы "О курсе"
function initAboutPage() {
    // Анимация для кнопки записи
    const ctaButton = document.getElementById('about-cta');
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSignupModal('Страница "О курсе"');
    });

    // Анимация для карточек движков
    const engineCards = document.querySelectorAll('.engine-card');
    engineCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('i');
            icon.style.transform = '';
        });
    });

    // Анимация для карточек навыков
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'rotate(15deg) scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
            icon.style.color = '#FFD700';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'rotate(0) scale(1)';
            icon.style.color = '#FFA500';
        });
    });

    // Анимация для возрастной иконки
    const ageIcon = document.querySelector('.age-icon');
    if (ageIcon) {
        ageIcon.addEventListener('click', () => {
            ageIcon.style.transform = 'scale(1.2)';
            ageIcon.style.background = 'linear-gradient(135deg, #FFA500, #FFD700)';
            
            setTimeout(() => {
                ageIcon.style.transform = '';
                setTimeout(() => {
                    ageIcon.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
                }, 300);
            }, 300);
        });
    }
}

// Инициализация страницы Unity
function initUnityPage() {
    // Анимация для кнопки записи
    const ctaButton = document.getElementById('unity-cta');
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSignupModal('Unity');
    });

    // Анимация для карточек преимуществ
    const advantageCards = document.querySelectorAll('.advantage-card');
    advantageCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.advantage-icon');
            icon.style.transform = 'rotate(15deg) scale(1.1)';
            icon.style.transition = 'transform 0.3s ease';
            icon.style.background = 'linear-gradient(135deg, #FF8C00, #FFD700)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.advantage-icon');
            icon.style.transform = '';
            icon.style.background = 'linear-gradient(135deg, #FFD700, #FF8C00)';
        });
    });

    // Анимация для карточек игр
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.game-image');
            image.style.transform = 'scale(1.05)';
            image.style.transition = 'transform 0.3s ease';
            
            const icon = image.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(15deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.game-image');
            image.style.transform = '';
            
            const icon = image.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });

    // Анимация для логотипа Unity
    const unityLogo = document.querySelector('.unity-logo');
    if (unityLogo) {
        unityLogo.addEventListener('mouseenter', () => {
            unityLogo.style.transform = 'scale(1.1)';
            unityLogo.style.transition = 'transform 0.3s ease';
        });
        
        unityLogo.addEventListener('mouseleave', () => {
            unityLogo.style.transform = '';
        });
    }
}

// Инициализация страницы Unreal Engine
function initUnrealPage() {
    // Анимация для кнопки записи
    const ctaButton = document.getElementById('unreal-cta');
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSignupModal('Unreal Engine');
    });

    // Анимация для карточек фич
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('i');
            icon.style.transform = 'scale(1.3)';
            icon.style.transition = 'transform 0.3s ease';
            icon.style.color = '#FF4500';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('i');
            icon.style.transform = '';
            icon.style.color = '#FF8C00';
        });
    });

    // Анимация для элементов "что научишься"
    const learnItems = document.querySelectorAll('.learn-item');
    learnItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'rotate(15deg) scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
            icon.style.color = '#FF8C00';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            icon.style.transform = '';
            icon.style.color = '#FF4500';
        });
    });

    // Анимация для большой иконки Unreal
    const unrealIcon = document.querySelector('.unreal-icon-large');
    if (unrealIcon) {
        unrealIcon.addEventListener('mouseenter', () => {
            unrealIcon.style.transform = 'scale(1.1)';
            unrealIcon.style.transition = 'transform 0.3s ease';
        });
        
        unrealIcon.addEventListener('mouseleave', () => {
            unrealIcon.style.transform = '';
        });
    }
}

// Инициализация страницы преподавателей
function initTeachersPage() {
    // Анимация для кнопки записи
    const ctaButton = document.getElementById('teachers-cta');
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSignupModal('Преподаватели');
    });

    // Анимация для кнопок "Задать вопрос"
    const askButtons = document.querySelectorAll('.ask-button');
    askButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Анимация клика
            button.style.transform = 'scale(0.95)';
            button.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 165, 0, 0.3))';
            
            // Получаем имя преподавателя
            const teacherName = button.getAttribute('data-teacher');
            
            // Эффект разлетающихся частиц
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    createParticleEffect(button, '#FFD700', '#FFA500');
                }, i * 50);
            }
            
            setTimeout(() => {
                button.style.transform = '';
                button.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 165, 0, 0.15))';
            }, 200);
            
            // Сообщение
            setTimeout(() => {
                alert(`Отлично! Ты хочешь задать вопрос ${teacherName}. В реальном сайте здесь открылась бы форма для отправки сообщения преподавателю!`);
            }, 700);
        });
    });

    // Анимация для тегов навыков
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-5px) scale(1.05)';
            tag.style.boxShadow = '0 5px 15px rgba(255, 215, 0, 0.2)';
            tag.style.background = 'rgba(255, 215, 0, 0.25)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = '';
            tag.style.boxShadow = '';
            tag.style.background = 'rgba(255, 215, 0, 0.1)';
        });
    });

    // Клик по аватару преподавателя
    const teacherAvatars = document.querySelectorAll('.teacher-avatar');
    teacherAvatars.forEach(avatar => {
        avatar.addEventListener('click', () => {
            // Анимация пульсации
            avatar.style.transform = 'scale(1.2)';
            setTimeout(() => {
                avatar.style.transform = '';
            }, 300);
            
            // Получаем имя преподавателя
            const teacherName = avatar.closest('.teacher-card').querySelector('.teacher-name').textContent;
            
            // Сообщение
            setTimeout(() => {
                alert(`Это ${teacherName}! В реальном сайте здесь можно было бы посмотреть больше фотографий и проектов преподавателя.`);
            }, 400);
        });
    });
}

// Инициализация страницы контактов
function initContactsPage() {
    // Обработка формы обратной связи
    const feedbackForm = document.getElementById('feedbackForm');
    const successMessage = document.getElementById('successMessage');
    const overlay = document.getElementById('overlay');
    const closeSuccess = document.getElementById('closeSuccess');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Анимация отправки формы
            const submitBtn = feedbackForm.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitBtn.disabled = true;
            
            // Эффект разлетающихся частиц
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    createParticleEffect(submitBtn, '#FFD700', '#FFA500');
                }, i * 50);
            }
            
            // Имитация отправки на сервер
            setTimeout(() => {
                // Сброс формы
                feedbackForm.reset();
                
                // Показать сообщение об успехе
                successMessage.style.display = 'block';
                overlay.style.display = 'block';
                
                // Восстановить кнопку
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Отправить сообщение';
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Закрытие сообщения об успехе
    if (closeSuccess) {
        closeSuccess.addEventListener('click', () => {
            successMessage.style.display = 'none';
            overlay.style.display = 'none';
        });
    }

    // FAQ аккордеон
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Закрыть все остальные элементы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключить текущий элемент
            item.classList.toggle('active');
            
            // Анимация иконки
            const icon = question.querySelector('i');
            if (item.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Интерактивные контактные элементы
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.contact-icon');
            icon.style.transform = 'scale(1.2) rotate(15deg)';
            icon.style.transition = 'transform 0.3s ease';
            icon.style.background = 'linear-gradient(135deg, #FFA500, #FFD700)';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.contact-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
        });
    });

    // Клик по карте
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', () => {
            // Анимация пульсации
            mapPlaceholder.style.transform = 'scale(0.98)';
            mapPlaceholder.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                mapPlaceholder.style.transform = '';
            }, 300);
            
            // Сообщение о карте
            setTimeout(() => {
                alert('Здесь будет интерактивная карта с нашим местоположением! В реальном сайте здесь можно было бы увидеть, как к нам добраться и построить маршрут.');
            }, 400);
        });
    }
}

// Функция для создания эффекта частиц
function createParticleEffect(element, color1, color2) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.background = `radial-gradient(circle, ${color1}, ${color2})`;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    
    const rect = element.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    
    document.body.appendChild(particle);
    
    // Анимация разлета
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80 + 40;
    const duration = Math.random() * 400 + 300;
    
    const animation = particle.animate([
        {
            transform: 'translate(0, 0) scale(1)',
            opacity: 1
        },
        {
            transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'cubic-bezier(0.2, 0, 0.8, 1)'
    });
    
    animation.onfinish = () => {
        document.body.removeChild(particle);
    };
}

// Функция показа модального окна записи
function showSignupModal(pageName) {
    // Анимация "пульсации" при клике
    const button = event.currentTarget;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);
    
    // Эффект разлетающихся частиц
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createParticleEffect(button, '#FFD700', '#FFA500');
        }, i * 30);
    }
    
    // Сообщение
    setTimeout(() => {
        alert(`Ура! Ты решил записаться на курс со страницы "${pageName}"! В ближайшее время мы свяжемся с тобой для уточнения деталей.`);
    }, 800);
}

// Эффект параллакса для декоративных элементов
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const decoration = document.querySelector('.decoration');
    if (decoration) {
        decoration.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Эффект свечения для логотипа при наведении
const logo = document.querySelector('.logo');
logo.addEventListener('mouseenter', () => {
    logo.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.5)';
});

logo.addEventListener('mouseleave', () => {
    logo.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
});

// Инициализация текущей страницы при загрузке
window.addEventListener('load', () => {
    // Определяем текущую страницу
    const activeLink = document.querySelector('.nav-link.active');
    const pageId = activeLink ? activeLink.getAttribute('data-page') : 'main';
    
    // Инициализируем анимации для текущей страницы
    initPageAnimations(pageId);
    
    // Эффект печатающегося текста для заголовков
    const pageHeaders = document.querySelectorAll('.page-header h1');
    pageHeaders.forEach(header => {
        if (header.closest('.page').classList.contains('active')) {
            const originalText = header.textContent;
            header.textContent = '';
            
            let i = 0;
            function typeWriter() {
                if (i < originalText.length) {
                    header.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
            
            setTimeout(typeWriter, 500);
        }
    });
});

// Обработка якорных ссылок внутри страниц
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Если это не навигационная ссылка
        if (!this.classList.contains('nav-link')) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});