# LINQ in JavaScript

I write a lot of C# and it has a really useful way to query large collections of data, called [LINQ](http://msdn.microsoft.com/en-us/library/vstudio/bb397926.aspx).

Although JavaScript arrays have querying capabilities through `map`, `reduce`, `filter` but the limitation is they process the entire array before going to the next step, meaning if you do a `map` then a `filter` the whole collection goes through map process before it starts filtering. This can be a problem with large data sets, it can take a while.

## Why LINQ?

The advantage of LINQ is that it uses lazy execusion, each item goes through the whole _pipeline_ before the next item is processed. So if you have a large data set you can easily process subsets of the data and break early.

## How does it work?

To do this it leverages the [ES6 Iterators](http://wiki.ecmascript.org/doku.php?id=harmony:iterators) to `yield` each value.

# Example

    var items = [1, 2, 3, 4, 5, 6].asEnumerable();

    for (let item in items.where(x => x % 2).select(x => x + 1))
        console.log(item);

    //output will be 2, 4, 6

# API

The following LINQ methods are implemented:

* `where`, aliased to `filter`
* `select`, aliased to `map`
* `first`, `firstOrDefault`
* `single`, `singleOrDefault`

# License

MIT