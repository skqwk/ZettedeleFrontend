import {v4} from 'uuid';


export const vaults = {
    vault1: {
        value: 'vault1',
        name: 'Курсовая работа', notes: [
            {title: 'Выбор темы', content: 'Приложение для заметок', date: '09.02.2023', id: 1, color: '#F59475'},
            {
                title: 'Анализ предметной области',
                content: 'Zettelkasten, EverNote, Google Keep',
                date: '09.02.2023',
                id: 2,
                color: '#F9C975'
            },
            {title: 'Программный стек', content: 'Java, Java Script', date: '09.02.2023', id: 3, color: '#E4F693'},
            {title: 'Архитектура', content: 'DDD, Clean Architecture', date: '09.02.2023', id: 4, color: '#B388F9'},
            {title: 'Реализация FE', content: 'React, Node', date: '09.02.2023', id: 5, color: '#13E8FB'},
            {title: 'Реализация BE', content: 'Spring Boot', date: '09.02.2023', id: 6, color: 'white'}
        ]
    },
    vault2: {
        value: 'vault2',
        name: 'Работа', notes: [
            {title: 'Java Core', content: 'Equals, Hash Code', date: '09.02.2023', id: 6, color: '#B388F9'},
            {title: 'Spring Boot 5', content: 'IoC, DI, Bean lifecycle', date: '09.02.2023', id: 7, color: '#13E8FB'},
            {title: 'JPA Hibernate', content: 'N+1 проблема, ORM', date: '09.02.2023', id: 8, color: '#F59475'},
            {title: 'Spring Web', content: 'Apache Tomcat, REST', date: '09.02.2023', id: 9, color: '#E4F693'},
        ]
    }
};


export const newVaults = {
    vault1: {
        name: 'Учеба',
        id: 'vault1',
        notes: [
            {
                id: v4(),
                createdAt: new Date(),
                editedAt: new Date(),
                title: 'Архитектура по EDA',
                head: 1,
                paragraphs: {
                    1: {
                        id: v4(),
                        createdAt: new Date(),
                        editedAt: new Date(),
                        content: '1. Определить основные события, которые должны происходить в приложении, такие как создание, изменение или удаление заметок.',
                        insertKey: v4(),
                        deleteKey: v4(),
                        link: 2
                    },
                    2: {
                        id: v4(),
                        createdAt: new Date(),
                        editedAt: new Date(),
                        content: '2. Разработать модель событий, которая описывает состояние системы и как она реагирует на события.',
                        insertKey: v4(),
                        deleteKey: v4(),
                        link: 2
                    },
                    3: {
                        id: v4(),
                        createdAt: new Date(),
                        editedAt: new Date(),
                        content: '3. Разделить приложение на слои, такие как слой приложения, слой бизнес-логики и слой инфраструктуры.',
                        insertKey: v4(),
                        deleteKey: v4(),
                        link: null
                    }
                }
            }
        ]
    }
}