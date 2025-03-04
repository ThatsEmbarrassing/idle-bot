# IDLE-BOT

---
ВНИМАНИЕ: БОТ ВРЕМЕННО НЕ РАБОТАЕТ И ДО ТЕХ ПОР, ПОКА ОН СНОВА НЕ НАЧНЁТ РАБОТАТЬ, РЕПОЗИТОРИЙ БУДЕТ АРХИВИРОВАН

У МЕНЯ НЕТ НИ СРЕДСТВ, НИ ВРЕМЕНИ НА ЕГО ХОСТИНГ И ПОДДЕРЖКУ
---

Бот для игрового сервера [IDLE.MSK.RU](https://idle.msk.ru) по игре Team Fortress 2

## В планах

-   [ ] Создать бота для телеграмма.
-   [x] Создать функционал, позволяющий принимать и обрабатывать ссылки на стим-профиль пользователя, как и форматы steamID.
-   [ ] Создать систему привязки аккаунтов(и дискорда, и телеграмма) к профилю в стиме.
-   [ ] Добавить систему жалоб на игроков.
-   [ ] **(ВОЗМОЖНО)** Создать возможность покупки випа на сервере через бота.
-   [ ] **(ВОЗМОЖНО)** Добавить более подробную статистику для игроков(сколько наиграл, когда впервые зашёл, где часто играет и т.д.)
-   [ ] **(ВОЗМОЖНО)** Добавить статистику по серверам(минимальный и максимальный онлайн, кол-во игроков на данный момент и т.д.)

## Стэк
- [NestJS](https://nestjs.com/)
- [Discord NestJS](https://github.com/fjodor-rybakov/discord-nestjs)
- [Discord.JS](https://discord.js.org/)
- [Purify-TS](https://gigobyte.github.io/purify/)
- [Docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [Turborepo](https://turbo.build/repo/docs)

## Ссылки

[Пригласить бота в дискорд сервер](https://discord.com/oauth2/authorize?client_id=1204576765821845596)

[Steam Web API](https://steamapi.xpaw.me)

## Дополнительно

Разработчик Idle API: Bloomstorm


# Команды

<table>
    <tr>
        <th>Имя команды</th>
        <th>Описание</th>
        <th>Параметры</th>
    </tr>
    <tr align="center">
        <td colspan=2></td>
        <td>
            <table>
                <tr align="center">
                    <td width="100px">Имя</td>
                    <td width="300px">Описание параметра</td>
                    <td width="150px">Обязательный</td>
                    <td width="300px">тип</td>
                    <td width="150px">Значение по умолчанию</td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td><i>/profile</i></td>
        <td>Основная информация об игроке, взятая с Steam Web API и Idle API</td>
        <td>
            <table>
                <tr align="center">
                    <td width="100px">steamid</td>
                    <td width="300px">Стим айди игрока</td>
                    <td width="150px">Да</td>
                    <td width="300px">
                        string. Допустимые форматы:
                        <ul align="left">
                            <li>Steam ID2 (<i>STEAM_X:Y:Z</i>)</li>
                            <li>Steam ID3 (<i>[U:X:Y]</i>)</li>
                            <li>Steam64 ID (<i>17-значное число</i>)</li>
                            <li>Ссылка (<i>steamcommunity.com/id и steamcommunity.com/profiles</i>)</li>
                        </ul>
                    </td>
                    <td width="150px">-</td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td><i>/history mutes</i></td>
        <td>Информация о всех мутах игрока</td>
        <td>
            <table>
                <tr align="center">
                    <td width="100px">steamid</td>
                    <td width="300px">Стим айди игрока</td>
                    <td width="150px">Да</td>
                    <td width="300px">
                        string. Допустимые форматы:
                        <ul align="left">
                            <li>Steam ID2 (<i>STEAM_X:Y:Z</i>)</li>
                            <li>Steam ID3 (<i>[U:X:Y]</i>)</li>
                            <li>Steam64 ID (<i>17-значное число</i>)</li>
                            <li>Ссылка (<i>steamcommunity.com/id и steamcommunity.com/profiles</i>)</li>
                        </ul>
                    </td>
                    <td width="150px">-</td>
                </tr>
                <tr align="center">
                    <td width="100px">details</td>
                    <td width="300px">Показывать ли подробную историю всех мутов</td>
                    <td width="100px">Нет</td>
                    <td width="300px">boolean</td>
                    <td width="150px">False</td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td><i>/history bans</i></td>
        <td>Информация о всех банах игрока</td>
        <td>
            <table>
                <tr align="center">
                    <td width="100px">steamid</td>
                    <td width="300px">Стим айди игрока</td>
                    <td width="150px">Да</td>
                    <td width="300px">
                        string. Допустимые форматы:
                        <ul align="left">
                            <li>Steam ID2 (<i>STEAM_X:Y:Z</i>)</li>
                            <li>Steam ID3 (<i>[U:X:Y]</i>)</li>
                            <li>Steam64 ID (<i>17-значное число</i>)</li>
                            <li>Ссылка (<i>steamcommunity.com/id и steamcommunity.com/profiles</i>)</li>
                        </ul>
                    </td>
                    <td width="150px">-</td>
                </tr>
                <tr align="center">
                    <td width="100px">details</td>
                    <td width="300px">Показывать ли подробную историю всех банов</td>
                    <td width="150px">Нет</td>
                    <td width="300px">boolean</td>
                    <td width="150px">False</td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td><i>/help</i></td>
        <td>Справка по всем командм</td>
        <td>
            <table>
                <tr align="center">
                    <td width="100px">command</td>
                    <td width="300px">Отображает справку по конкретной команде</td>
                    <td width="150px">Нет</td>
                    <td width="300px">string</td>
                    <td width="150px">help</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
