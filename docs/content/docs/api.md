# API Reference

Storybook has rich API providing flexible ability to create, organize and customize the stories of your components whatever framework you use

## Consumer Storybook API

Consumer API are intended to organize your components into [stories](docs/structure) and [extend](guide/creating_addons) Storybook functionalities. 

### storiesOf

The core function for creating stories. It can be accessed using:

```js
import { storiesOf } from '@storybook/react'
```

NPM: `@storybook/react`

Github: https://github.com/storybooks/storybook/tree/master/app/react

Usage:

```js
stories = storiesOf(storyKindName, module)
```

- **storyKindName** [`string`] Name of stories set. Will be shown as group of stories at the [stories](/structure#stories_panel) panel. Each storyKindName must be unique.

- **module** [`object`] Webpack module object. Provides HMR handling

- Returns: **stories** [[`Stories`]](api#stories) Stories object representing API for creating and controling stories.

Example:

```js
const buttonStory = storiesOf('Button', module);
```

**storyKindName** supports patterns for advanced stories organization: [hierarchy](api#stories_hierarchy) and [multistories](api#multistories_mode).

Guides:

- how to write stories [link](guides/??)

- advanced stories organization [link](guides/??) 

See also:

- [Stories](api#stories) object

- [configure()](api#configure)

- [setAddon()](api#setsddon)

- [setOptions()](api#setoptions)

- [Stories hierarchy](api#stories_hierarchy)

- [Multistories mode](api#multistories_mode)


#### Stories hierarchy

**storyKindName** argument passing to [storiesOf](api#storiesof) may contain symbols for dividing stories into nested levels. 

**Stories hierarchy** helps you organize how your stories will look at the *Stories panel*. It doesn't affect how it appears in the *Preview area*.

Default separators: `/`, `:/`.

Example:

```js
storiesOf('Widgets/Buttons/Default', module);
storiesOf('Widgets/Buttons/Accent', module);
storiesOf('Widgets/Buttons/Disabled', module);
```

It will create `Widgets` stories group which will contain `Buttons` subgroup. And `Buttons` will have tree subgroups: `Default`, `Accent` and `Disabled`.

You can set your own hierarchy separators passing `hierarchySeparator` option via [setOption](api#setoptins) API:

```js
setOptions({
  hierarchySeparator: /\.|:\./,
});
```

- **hierarchySeparator** [`string`] or [`regular expression`]

If you pass string it should contain body of regular expression.
**Note**: In case of string don't forget to escape regexp characters, so the `/\//` regexp becomes a `'\\/'` string.

Guides:

- advanced stories organization [link](guides/??) 

See also:

- [storiesOf()](api#storiesof)

- [Stories](api#stories) object

- [Multistories mode](api#multistories_mode)


#### Multistories mode

**storyKindName** argument passing to [storiesOf](api#storiesof) may contain symbols to indicate multistory sections.

**Multistories mode** unlike singlestory displays all stories of the section at preview area. It doesn't affect how it appears at the *Stories panel*.

Default separator: `:`.

Example:

```js
storiesOf('Buttons Default:', module);
```

It will create a multistory group: selecting any story from `Buttons Default:` will show all containing stories at once.

**Note** [Decorators](api#global_decorator) will be applied separately to each story. If you need to set common decorator for the whole preview page use [Preview decorator](api#preview_decorator) instead.

**Grouping multistory sections** allows to union some story sets with different `storyKindName` into one multistory section. `storyKindName` should have the same parts before multistories separator.

Example:

```js
storiesOf('Buttons: Default', module);
storiesOf('Buttons: Accent', module);
```

It will create two stories sets with common multistories page. You can access the common and extra part of the **storyKindName** via [decorators](api#global_decorator). In combination with other `context` parameters this is a great opportunity to customize your storybook appearance and behaviour (see advanced stories organization [link](guides/??) guide for details).

**Multistories with hierarchy**: Applying multistories mode over the common [hierarchy](api#stories_hierarchy) levels provides good story organization experience.

Example:

```js
storiesOf('Widgets/Buttons:/Default', module);
storiesOf('Widgets/Buttons:/Accent', module);
storiesOf('Widgets/Buttons:/Disabled', module);
```

It'll create nested stories structure with all `Widgets/Buttons` stories in one preview page divided into three groups of `Default`, `Accent` and `Disabled` sections.

You can set your own multistories separator passing `multistorySeparator` option via [setOption](api#setoptions) API:

```js
setOptions({
  multistorySeparator: /#/,
});
```

- **multistorySeparator** [`string`] or [`regular expression`]

If you pass string it should contain body of regular expression.
**Note**: In case of string don't forget to escape regexp characters, so the `/\//` regexp becomes a `'\\/'` string.


Guides:

- advanced stories organization [link](guides/??) 

See also:

- [storiesOf()](api#storiesof)

- [Stories](api#stories) object

- [Preview decorator](api#preview_decorator)

- [Stories hierarchy](api#stories_hierarchy)


#### Preview decorator

#### Stories object

##### .add

##### .addDecorator


### setAddon API

### global decorator

### Addon panels API

### setOptions API

### storyshorts

## Internal Storybook API

### UI API

### UI mantra modules API

### Story Store API
