export let users = [
    { username: "fom_tree", name: "Tom" },
    { username: "dadd", name: "Dad" },
    { username: "muma", name: "Mum" },
]

export let friends = [
    {
        username: "fom_tree", friends: [
            { username: "dadd" },
            { username: "muma" },
            { username: "jim" },
            { username: "bob" },
        ]
    },
    {
        username: "dadd", friends: [
            { username: "muma" }
        ]
    },
    {
        username: "muma", friends: [
            { username: "dadd" },
            { username: "muma" }
        ]
    }
]

export let chats = [
    { chatId: 1, name: "Mum" },
    { chatId: 2, name: "Tesla fan boys" },
    { chatId: 3, name: "family" },
    { chatId: 4, name: "parents" },
]

export let usersChats = [
    { chatId: 1, username: "fom_tree" },
    { chatId: 3, username: "fom_tree" },
    { chatId: 3, username: "muma" },
    { chatId: 4, username: "muma" },
    { chatId: 1, username: "muma" },
    { chatId: 2, username: "dadd" },
    { chatId: 3, username: "dadd" },
    { chatId: 4, username: "dadd" },
]

export let messages = [
    { messageId: 1, username: "fom_tree", chatId: 1, message: "Hello mum" },
    { messageId: 2, username: "muma", chatId: 1, message: "Hello Tom" },
    { messageId: 3, username: "dadd", chatId: 2, message: "Welcome to Tesla Fan boys club" },
]