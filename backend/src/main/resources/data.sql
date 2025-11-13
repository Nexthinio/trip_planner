-- ========================================
-- USERS
-- ========================================
INSERT INTO app_user (username, password)
VALUES
    ('admin', '$2a$10$n20xx0MXoBzG7TB1h8PF1Oxmejmfbxj8n7M4qJ6tMz1en6UDmhbky'), --admin123
    ('jakub', '$2a$10$vGGakmybbkVYdf/C/.j0o.JdjOqha8u4kY4jtY6ODxnRSGjfHaGri'), --test123
    ('anna', '$2a$10$N/M9U8JDWi/MZP9Lt2LuHeRWh.iwcuo/e1FwywBl6cWsYiqp259xW'); --pass123

-- ========================================
-- TRIPS
-- ========================================
INSERT INTO trip (title, description, destination, start_date, end_date, budget, user_id, is_done)
VALUES
    ('Wakacje w Hiszpanii', 'Relaks na plaży i dobra kuchnia', 'Wyspy Kanaryjskie', '2025-08-01', '2025-09-14', 3000.00, 1, false),
    ('Weekend w Pradze', 'Zabytki, piwo i klimat Starego Miasta', 'Praga, Czechy', '2025-04-10', '2025-04-13', 800.00, 2, false),
    ('Podróż po Włoszech', 'Rzym, Florencja i Wenecja — klasyka!', 'Włochy', '2025-06-01', '2025-06-15', 2500.00, 3, false),
    ('Góry w Zakopanem', 'Wycieczka w Tatry i oscypki', 'Zakopane, Polska', '2025-02-05', '2025-02-10', 500.00, 1, true);

-- ========================================
-- FILES (obrazy powiązane z tripami)
-- ========================================
INSERT INTO file (url, trip_id)
VALUES
    ('https://images.unsplash.com/photo-1605488708403-b7ed75f40df4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742', 1),
    ('https://upload.wikimedia.org/wikipedia/commons/1/11/Test-Logo.svg', 2),
    ('https://upload.wikimedia.org/wikipedia/commons/1/11/Test-Logo.svg', 3),
    ('https://images.unsplash.com/photo-1653493168544-b3eb59e344c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740', 4);
