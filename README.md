# test-task

!!ВАЖЛИВО!!
1) В завданні було вказано використовувати SFC на основі Webpack (відповідно і Vue CLI), проте актуальна документація Vue вказує, що цей метод deprecated і Vue Cli знаходиться у стані підтримки. Для нових проектів рекомендуєтсья використовувати Vite в якості бандлера, тому його і використав. Сподіваюсь це не буде проблемою :)
2) Логін форму зробив у двох варіантах: Та, що на дизайні та така, яка більше підходить до загальних стілів проекту. Можна змінити за допомогою switch-кнопки на сторінці логіну.
3) Використання тайпскріпта в тз не пропонується, проте використав його для демонстрації, оскільки в вакансії передбачено володіння ним. Та і type-safety зайвою ніколи не буде, хоч і забирає трохи більше часу :)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
