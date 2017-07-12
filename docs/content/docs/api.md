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

Github: <https://github.com/storybooks/storybook/tree/master/app/react>

Syntax:

```js
stories = storiesOf(storyKindName, module)
```

-   **storyKindName** [`string`] Name of stories set. Will be shown as group of stories at the [stories](/structure#stories_panel) panel. Each storyKindName must be unique.

-   **module** [`object`] Webpack module object. Provides HMR handling

Return value: 

**stories** [\[`Stories`\]](api#stories) Stories object representing API for creating and controling stories.

Example:

```js
const buttonStory = storiesOf('Button', module);
```

**storyKindName** supports patterns for advanced stories organization: [hierarchy](api#stories_hierarchy) and [multistories](api#multistories_mode).

Guides:

-   how to write stories [link](guides/??)

-   advanced stories organization [link](guides/??) 

See also:

-   [Stories](api#stories) object

-   [configure()](api#configure)

-   [setAddon()](api#setsddon)

-   [setOptions()](api#setoptions)

-   [Stories hierarchy](api#stories_hierarchy)

-   [Multistories mode](api#multistories_mode)

#### Stories hierarchy

**storyKindName** argument passing to [storiesOf](api#storiesof) may contain symbols for dividing stories into nested levels. 

**Stories hierarchy** helps you organize how your stories will look at the _Stories panel_. It doesn't affect how it appears in the _Preview area_.

Default separators: `/`, `:/`.

Example:

```js
storiesOf('Widgets/Button/Default', module);
storiesOf('Widgets/Button/Accent', module);
storiesOf('Widgets/Button/Disabled', module);
```

It will create `Widgets` stories group which will contain `Buttons` subgroup. And `Buttons` will have tree subgroups: `Default`, `Accent` and `Disabled`.

You can set your own hierarchy separators passing `hierarchySeparator` option via [setOption](api#setoptins) API:

```js
setOptions({
  hierarchySeparator: /\.|:\./,
});
```

-   **hierarchySeparator** [`string`] or [`regular expression`]

If you pass string it should contain body of regular expression.
**Note**: In case of string don't forget to escape regexp characters, so the `/\//` regexp becomes a `'\\/'` string.

Guides:

-   advanced stories organization [link](guides/??) 

See also:

-   [storiesOf()](api#storiesof)

-   [Stories](api#stories) object

-   [Multistories mode](api#multistories_mode)

#### Multistories mode

**Waiting for API settle down**

Guides:

-   advanced stories organization [link](guides/??) 

See also:

-   [storiesOf()](api#storiesof)

-   [Stories](api#stories) object

-   [Preview decorator](api#preview_decorator)

-   [Stories hierarchy](api#stories_hierarchy)

#### Stories object

The object representing API for creating and controling stories within a group specified by **storyKindName**. It can be accessed by [storiesOf](api#storiesof) function.

Example:

```js
const buttonStory = storiesOf('Button', module);
```

Methods:

##### .add

Adds single story to a `stories` object.

Syntax:

```js
stories = stories.add(storyName, function storyfn(context) { /* Return a new story */ })
```

-   **storyName** [`string`] Name of adding story. Will be shown at the [stories](/structure#stories_panel) panel. Each storyName must be unique within this `stories` object.

-   **storyfn** [`function`] a function representing a story. Should return a valid React Component. Taking one argument:

-   -   context - an object with information about specified story and storiesObject. Containing fields:

-   -   -   kind - current **storyKindName** 

-   -   -   story - current **storyName**

Return value:

-   **stories** The same stories object so you can chain a list of stories in a row.

Example:

```js
storiesOf('Button', module)
  .add('with text', () => (
    <Button>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button>😀 😎 👍 💯</Button>
  ));
```

Stories will be shown at the Stories Panel in the same order as they was added to the `stories` object \*\*

Guides:

-   how to write stories [link](guides/??)

See also:

-   [storiesOf()](api#storiesof)

-   [.addDecorator](api#adddecorator)

##### .addDecorator

Adds a stories decorator to a `stories` object.

Syntax:

```js
stories = stories.addDecorator(function decoratorFn(storyfn, context) { /* Return a decorator */ })
```

-   **decoratorFn** [`function`] a decorator function. Should return a valid React Component. Taking two arguments:

-   -   storyfn - a current function with a decorated story.

-   -   context - an object with information about specified story and storiesObject. Containing fields:

-   -   -   kind - current **storyKindName**

-   -   -   story - current **storyName**

-   -   -   kindRoot - part of **storyKindName** before the first **multistorySeparator**. If there is no **multistorySeparator** it's same as `kind`

-   -   -   selectedStory - in multi stories mode the story selected at the Stories Panel. In single stories mode it's same as a story

-   -   -   onStoryDidMount(function storyDidMount(elmentID)) - a function that takes a callback function `storyDidMount` as an agrument, which will be invoked after all stories will be mounted. storyDidMount will be invoked with an argument:

-   -   -   -   elmentID [`string`] - an ID attribute of `<div>` node containing the current story

Return value:

-   **stories** The same stories object so you can add stories or another decorators.

Decorators composition:

You can add several decorators to a `stories` object. They will wrap each other in a nesting way.
**Note**: Next added decorator will wrap the previous ones. 

TODO: check the decorators order

Example:

```js
storiesOf('Button', module)
  .addDecorator(innerDecorator())
  .addDecorator(mediumDecorator())
  .addDecorator(rootDecorator())
  .add('with text', () => (
    <Button>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button>😀 😎 👍 💯</Button>
  ));
```

Guides:

-   how to write stories [link](guides/??)

-   advanced stories organization [link](guides/??)

See also:

-   [storiesOf()](api#storiesof)

-   [.add](api#add)

##### `.<addonFn>`

### setAddon(addon)

### addDecorator(decorator)

### clearDecorators()

### getStorybook()

### Addon panels API

### setOptions API

#### Preview decorator

### storyshorts

## Internal Storybook API

### UI API

### UI mantra modules API

### Story Store API
