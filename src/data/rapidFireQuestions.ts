export interface RapidFireQuestion {
  id: string;
  question: string;
  /** Plain text; wrap identifiers/snippets in backticks for inline-code styling. */
  answer: string;
}

export interface RapidFireCategory {
  id: string;
  title: string;
  questions: RapidFireQuestion[];
}

let counter = 0;
const q = (question: string, answer: string): RapidFireQuestion => ({
  id: `rf-${++counter}`,
  question,
  answer,
});

export const rapidFireCategories: RapidFireCategory[] = [
  {
    id: "execution-model",
    title: "Interpreter & execution model",
    questions: [
      q(
        "Is Python compiled or interpreted?",
        "Both, in a sense: source is compiled to platform-independent bytecode (cached as `.pyc` files), and that bytecode is then executed by the Python Virtual Machine (PVM). It's neither purely interpreted line-by-line nor compiled to native machine code."
      ),
      q(
        "What is CPython?",
        "The reference implementation of Python, written in C — what you get from python.org. Alternatives include PyPy (JIT-compiled, often faster), Jython (runs on the JVM), and IronPython (.NET)."
      ),
      q(
        "What does `if __name__ == \"__main__\":` do, and why is it useful?",
        "`__name__` equals `\"__main__\"` only when the file is executed directly (not imported). The guard lets a file serve double duty as both an importable module and a runnable script, without running script-only code on import."
      ),
      q(
        "What's the difference between running `python script.py` and `python -m module`?",
        "`-m` runs a module as a script while ensuring it's imported the normal way (correct `sys.path` handling and package context) — it's the standard way to invoke tools like `pip`, `venv`, and `pytest`."
      ),
      q(
        "What is `__pycache__`?",
        "A directory where CPython stores compiled bytecode (`.pyc` files) for modules, so subsequent imports can skip recompilation if the source hasn't changed."
      ),
      q(
        "How would you inspect the bytecode for a function?",
        "Use the `dis` module: `dis.dis(my_function)` prints the disassembled bytecode instructions the PVM will execute."
      ),
    ],
  },
  {
    id: "variables-types",
    title: "Variables, types & mutability",
    questions: [
      q(
        "Are Python variables typed?",
        "No — Python is dynamically typed. Types belong to *objects*, not to the names that reference them; the same name can be rebound to objects of different types over its lifetime."
      ),
      q(
        "What's the difference between `is` and `==`?",
        "`==` compares values (calls `__eq__`); `is` compares object identity (whether two names refer to the exact same object in memory, equivalent to `id(a) == id(b)`). Use `is` for `None` checks; use `==` for value comparisons."
      ),
      q(
        "Name Python's immutable built-in types.",
        "`int`, `float`, `complex`, `bool`, `str`, `tuple`, `frozenset`, and `range`. Their mutable counterparts are `list`, `dict`, `set`, and (of course) custom mutable classes."
      ),
      q(
        "Why can a `tuple` be used as a dictionary key but a `list` can't?",
        "Dict keys must be hashable, and an object is generally hashable only if it's immutable (its hash must not change over its lifetime). Tuples are immutable and hashable (provided their elements are too); lists are mutable and explicitly unhashable."
      ),
      q(
        "Is `bool` really a subtype of `int` in Python?",
        "Yes — `bool` is a subclass of `int`. `True == 1` and `False == 0` both evaluate to `True`, and booleans can be used anywhere an int is expected (e.g., as list indices, or summed directly)."
      ),
      q(
        "What makes an object 'falsy' in Python?",
        "`None`, `False`, numeric zero (`0`, `0.0`), and empty containers (`\"\"`, `[]`, `{}`, `set()`, `()`). Everything else is truthy — including non-empty strings like `\"False\"` or `\"0\"`."
      ),
      q(
        "What does `id()` return, and what does it mean if `id(a) == id(b)`?",
        "`id()` returns a unique integer identifying an object's identity (in CPython, its memory address). `id(a) == id(b)` means `a` and `b` are the same object — equivalent to `a is b`."
      ),
    ],
  },
  {
    id: "operators",
    title: "Operators & expressions",
    questions: [
      q(
        "What's the difference between `/` and `//`?",
        "`/` is true division and always returns a `float`; `//` is floor division — it divides and rounds down to the nearest integer (returning an `int` if both operands are `int`)."
      ),
      q(
        "Do `and` and `or` always return `True`/`False`?",
        "No — they're short-circuiting and return one of their *operands*. `a or b` returns `a` if `a` is truthy, else `b`; `a and b` returns `a` if `a` is falsy, else `b`. This underlies the `value = arg or default` idiom."
      ),
      q(
        "What does the walrus operator `:=` do?",
        "Introduced in Python 3.8, it assigns a value to a name *and* produces that value as the result of the expression — letting you assign and test in the same expression, e.g. `if (n := len(data)) > 10:`."
      ),
      q(
        "Are comparison operators chainable in Python?",
        "Yes — `1 < x < 10` is equivalent to `(1 < x) and (x < 10)`, evaluating `x` only once. This is a Python-specific convenience many other languages lack."
      ),
      q(
        "What's the difference between `+=` on a list vs. a tuple?",
        "On a list, `+=` calls `__iadd__`, which extends the list *in place* (mutates the same object). On a tuple (immutable, no `__iadd__`), it falls back to `__add__`, creating a new tuple and rebinding the name."
      ),
    ],
  },
  {
    id: "strings",
    title: "Strings",
    questions: [
      q(
        "Are Python strings mutable?",
        "No — strings are immutable sequences of Unicode code points. Every method that looks like it 'modifies' a string (`.upper()`, `.replace()`, `.strip()`) actually returns a new string."
      ),
      q(
        "Why is `result += chunk` in a loop considered bad practice for building strings?",
        "Because strings are immutable, each `+=` allocates an entirely new string and copies the old contents — making the loop O(n²) overall. `\"\".join(chunks)` builds the result in O(n)."
      ),
      q(
        "What's the cleanest way to reverse a string in Python?",
        "Extended slicing: `s[::-1]`. It creates a new string by stepping through the original backwards."
      ),
      q(
        "What are the three main ways to format strings, and which is preferred?",
        "Old `%`-formatting, `str.format()`, and f-strings (`f\"{value}\"`, Python 3.6+). f-strings are preferred — they're more readable, support arbitrary expressions, and are evaluated into efficient bytecode at compile time."
      ),
      q(
        "What does `s[1:5:2]` mean for a string `s`?",
        "Slice notation `[start:stop:step]` — characters at indices 1 and 3 (starting at 1, stopping before 5, stepping by 2)."
      ),
      q(
        "What's the difference between `str.split()` and `str.split(\" \")`?",
        "`split()` with no arguments splits on *any* run of whitespace and discards empty strings from the result; `split(\" \")` splits on each literal space and keeps empty strings (e.g., from consecutive spaces)."
      ),
    ],
  },
  {
    id: "collections",
    title: "Collections: lists, tuples, sets, dicts",
    questions: [
      q(
        "When would you choose a `set` over a `list`?",
        "When you need fast membership testing (`in` is O(1) average for sets vs. O(n) for lists), need to deduplicate, or need set algebra (union, intersection, difference)."
      ),
      q(
        "Do dictionaries preserve insertion order?",
        "Yes — as a guaranteed language feature since Python 3.7 (it was a CPython implementation detail in 3.6)."
      ),
      q(
        "What is a `namedtuple`, and why use one?",
        "A factory (from `collections`) that creates tuple subclasses with named fields — giving you readable, immutable, lightweight records (`p.x` instead of `p[0]`) without the overhead of a full class."
      ),
      q(
        "What's the difference between `list.sort()` and `sorted(list)`?",
        "`list.sort()` sorts in place and returns `None`; `sorted()` returns a new sorted list (or any iterable converted to a list) and leaves the original untouched."
      ),
      q(
        "What's the time complexity of `x in some_list` vs `x in some_set`?",
        "O(n) average for a list (linear scan) vs. O(1) average for a set or dict (hash-based lookup)."
      ),
      q(
        "What's the difference between `dict.get(key)` and `dict[key]`?",
        "`dict[key]` raises `KeyError` if the key is absent; `dict.get(key, default)` returns `default` (or `None`) instead — a safer lookup when a missing key is expected and not exceptional."
      ),
      q(
        "What is a generator expression, and how does it differ from a list comprehension?",
        "`(x for x in iterable)` looks like a list comprehension but produces values lazily, one at a time, without materializing the whole sequence in memory — crucial for large or infinite sequences."
      ),
      q(
        "Why must dictionary keys be hashable?",
        "Because dicts are implemented as hash tables — the key's hash determines where its entry is stored. A mutable object's hash could change after insertion, corrupting the table, so Python requires (and, for built-ins, enforces) immutability for hashability."
      ),
    ],
  },
  {
    id: "control-flow",
    title: "Control flow",
    questions: [
      q(
        "What does the `else` clause on a `for` loop do?",
        "It runs if the loop completes *without* hitting a `break` — the idiomatic 'searched everything, found nothing' pattern, e.g. searching for a prime and reporting 'none found' only if the loop never broke early."
      ),
      q(
        "What does `enumerate()` give you that a manual index counter doesn't?",
        "A clean, Pythonic way to get `(index, value)` pairs while iterating, with an optional `start` parameter — avoiding manual counter bookkeeping and off-by-one errors."
      ),
      q(
        "How is Python's `match` statement different from a C-style `switch`?",
        "`match` performs *structural pattern matching* — it can destructure sequences, mappings, and class instances, bind variables from the matched structure, and apply guard conditions (`case [x, y] if x == y:`), not just compare a single value to constants."
      ),
      q(
        "What does `zip()` do, and what happens with unequal-length iterables?",
        "It pairs up elements from multiple iterables into tuples, stopping as soon as the *shortest* iterable is exhausted. `itertools.zip_longest` is the variant that pads with a fill value instead."
      ),
    ],
  },
  {
    id: "functions-scope",
    title: "Functions & scope",
    questions: [
      q(
        "Why is `def f(items=[]):` dangerous?",
        "Default argument values are evaluated exactly once, when the `def` statement runs — so every call that doesn't supply its own `items` shares and mutates the *same* list object across calls. Default to `None` and create the mutable object inside the function body instead."
      ),
      q(
        "What does the LEGB rule describe?",
        "The order Python searches for a name: Local → Enclosing → Global → Built-in. The first scope where the name is found wins."
      ),
      q(
        "What's the difference between `global` and `nonlocal`?",
        "`global` lets a function rebind a name in the module's global scope; `nonlocal` lets a nested function rebind a name in its nearest enclosing (non-global) function scope. Both are needed only for *rebinding* — reading an outer-scope name works without them."
      ),
      q(
        "What is a closure?",
        "A function that captures and remembers variables from the scope in which it was defined, even after that outer scope has finished executing — e.g., a `make_multiplier(factor)` factory whose returned function still 'remembers' `factor`."
      ),
      q(
        "What's the difference between `*args` and `**kwargs`?",
        "`*args` collects extra positional arguments into a tuple; `**kwargs` collects extra keyword arguments into a dict. The same `*`/`**` syntax *unpacks* sequences/mappings into arguments at the call site."
      ),
      q(
        "What does a bare `*` in a function signature do, e.g. `def f(a, *, b):`?",
        "It forces every parameter after it to be passed by keyword only — `f(1, 2)` would raise `TypeError`; you must call `f(1, b=2)`. A bare `/` does the mirror-image: forces parameters before it to be positional-only."
      ),
      q(
        "Are functions first-class objects in Python?",
        "Yes — they can be assigned to variables, stored in data structures, passed as arguments, and returned from other functions. This is the foundation for higher-order functions, decorators, and callbacks."
      ),
    ],
  },
  {
    id: "oop",
    title: "Object-oriented programming",
    questions: [
      q(
        "What's the difference between `__repr__` and `__str__`?",
        "`__repr__` should produce an unambiguous, developer-facing representation (ideally one that could recreate the object); `__str__` produces a readable, user-facing representation. If `__str__` is missing, Python falls back to `__repr__`."
      ),
      q(
        "What does `super()` do, and why is it preferred over naming the parent class directly?",
        "`super()` returns a proxy that delegates method calls along the class's Method Resolution Order (MRO) — it correctly supports cooperative multiple inheritance, whereas hardcoding `ParentClass.method(self, ...)` can call the wrong method or call it twice in diamond hierarchies."
      ),
      q(
        "What's the difference between `@classmethod` and `@staticmethod`?",
        "A `@classmethod` receives the class itself (`cls`) as its first argument — commonly used for alternative constructors. A `@staticmethod` receives neither `self` nor `cls`; it's just a regular function namespaced inside the class."
      ),
      q(
        "Does Python have true private attributes?",
        "Not really. `_name` is a 'leave this alone' convention; `__name` triggers name mangling to `_ClassName__name`, mainly to avoid accidental collisions in subclasses — neither provides real access control."
      ),
      q(
        "What does `@dataclass` generate for you?",
        "By default, `__init__`, `__repr__`, and `__eq__`, based on the class's type-annotated attributes — and optionally ordering methods (`order=True`) or immutability (`frozen=True`) — eliminating boilerplate for data-holding classes."
      ),
      q(
        "What is the MRO (Method Resolution Order)?",
        "The linearized order in which Python searches base classes for an attribute or method, computed via the C3 linearization algorithm. You can inspect it with `ClassName.__mro__` or `ClassName.mro()`."
      ),
      q(
        "What does `@property` let you do that a plain attribute can't?",
        "Expose a method as if it were a plain attribute — enabling computed values, validation on assignment (via a paired setter), and lazy evaluation, all while keeping the call site as simple attribute access (`obj.value`, not `obj.get_value()`)."
      ),
      q(
        "How do you make a class instance usable in a `for` loop?",
        "Implement `__iter__` (returning an iterator) — or, more simply, `__getitem__` accepting integer indices starting from 0, which Python will fall back to for iteration if `__iter__` is absent."
      ),
    ],
  },
  {
    id: "exceptions",
    title: "Exceptions & context managers",
    questions: [
      q(
        "Why is a bare `except:` considered bad practice?",
        "It catches *everything*, including `SystemExit` and `KeyboardInterrupt` (which subclass `BaseException`, not `Exception`), silently swallowing bugs and making programs hard to interrupt or debug. Catch the most specific exception(s) you can meaningfully handle."
      ),
      q(
        "What does the `else` clause on a `try` block do?",
        "It runs only if the `try` block completes *without* raising — useful for code that should execute after success but that you don't want the `try` to also guard (and potentially mask errors from)."
      ),
      q(
        "What's the difference between `raise X` and `raise X from Y`?",
        "`raise X from Y` explicitly chains exception `Y` as the cause of `X` (`X.__cause__ = Y`), preserving and surfacing the original traceback — clearer than letting Python implicitly chain via `__context__`, especially when re-raising as a different, higher-level exception type."
      ),
      q(
        "What protocol powers the `with` statement?",
        "The context manager protocol: `__enter__` (run on entry, its return value optionally bound via `as`) and `__exit__` (always run on exit — even if an exception occurred — and able to suppress it by returning a truthy value)."
      ),
      q(
        "How does `contextlib.contextmanager` let you avoid writing a full class?",
        "It turns a generator function with a single `yield` into a context manager: code before `yield` runs as `__enter__`, the value yielded is bound by `as`, and code after `yield` (ideally in a `finally`) runs as `__exit__`."
      ),
      q(
        "Should custom exceptions subclass `Exception` or `BaseException`?",
        "`Exception`. `BaseException` is the root reserved for system-exiting exceptions like `SystemExit` and `KeyboardInterrupt`, which a broad `except Exception:` is intentionally designed *not* to catch."
      ),
    ],
  },
  {
    id: "modules-imports",
    title: "Modules & imports",
    questions: [
      q(
        "What's the difference between a module and a package?",
        "A module is a single `.py` file; a package is a directory of modules, traditionally marked by an `__init__.py` file (Python also supports 'namespace packages' without one)."
      ),
      q(
        "Why does Python only execute a module's top-level code once, no matter how many times it's imported?",
        "Because imported modules are cached in `sys.modules`. Subsequent `import` statements for the same module return the cached module object directly — which is also why mutating shared module-level state is visible everywhere that module is imported."
      ),
      q(
        "Absolute vs. relative imports — which is generally preferred, and why?",
        "Absolute imports (`from app.services.billing import charge_card`) are generally preferred — they're unambiguous and remain correct if you move the importing file, whereas relative imports (`from .billing import ...`) are tied to package structure and only valid inside packages."
      ),
      q(
        "What problem do virtual environments solve?",
        "They give each project its own isolated package directory (`site-packages`), preventing dependency version conflicts between projects that would otherwise share one global Python installation."
      ),
    ],
  },
  {
    id: "iterators-generators",
    title: "Iterators & generators",
    questions: [
      q(
        "What's the difference between an iterable and an iterator?",
        "An iterable implements `__iter__` and can produce iterators on demand (and can be iterated multiple times); an iterator implements `__next__` (and `__iter__` returning itself), is stateful, gets exhausted, and raises `StopIteration` when done. Every iterator is an iterable, but not every iterable is an iterator."
      ),
      q(
        "What happens when a function contains a `yield` statement?",
        "It becomes a generator function: calling it doesn't run the body — it returns a generator object. Each call to `next()` runs the body up to the next `yield`, returns that value, and suspends with all local state preserved until the next `next()`."
      ),
      q(
        "Why are generators more memory-efficient than building a full list?",
        "They produce values lazily, one at a time, on demand — using O(1) memory regardless of how many values are produced — instead of materializing an entire collection in memory up front."
      ),
      q(
        "What does `yield from` do?",
        "It delegates iteration to a sub-iterable (or sub-generator), yielding each of its values in turn — effectively flattening nested iteration into the outer generator with much less boilerplate than a manual loop."
      ),
      q(
        "Can you iterate over a generator twice?",
        "No — generators are single-use iterators. Once exhausted (or partially consumed), you'd need to call the generator function again to get a fresh one."
      ),
    ],
  },
  {
    id: "decorators",
    title: "Decorators",
    questions: [
      q(
        "What does `@decorator` above a function definition actually do?",
        "It's syntactic sugar for `func = decorator(func)` — the decorator receives the function object and returns a (typically wrapped) replacement that gets bound to the same name."
      ),
      q(
        "Why is `functools.wraps` important inside a decorator's wrapper function?",
        "Without it, the wrapper replaces the original function's `__name__`, `__doc__`, and other metadata with its own generic values — breaking introspection, debugging, and documentation tools. `@functools.wraps(func)` copies that metadata onto the wrapper."
      ),
      q(
        "How do you write a decorator that accepts its own arguments, like `@retry(times=3)`?",
        "Add an extra layer of nesting: an outer factory function that takes the decorator's arguments and returns the actual decorator function, which in turn returns the wrapper."
      ),
      q(
        "In what order do stacked decorators apply?",
        "Bottom-up: `@a` `@b` above `def f` means `f = a(b(f))` — `b` wraps `f` first, then `a` wraps the result."
      ),
      q(
        "Name some decorators from the standard library you've likely used without writing your own.",
        "`@property`, `@staticmethod`, `@classmethod`, `@functools.lru_cache`, `@functools.wraps`, and `@functools.cached_property` are all common — and they're built on exactly the same wrap-a-callable mechanism as a hand-written decorator."
      ),
    ],
  },
  {
    id: "functional",
    title: "Functional tools",
    questions: [
      q(
        "When would you reach for `functools.lru_cache`?",
        "To memoize a pure function whose results depend only on its (hashable) arguments — classically turning an exponential naive-recursive algorithm like Fibonacci into a linear one with no structural change to the code."
      ),
      q(
        "What's the difference between `map`/`filter` and list comprehensions?",
        "They're functionally similar (both produce transformed/filtered sequences), but comprehensions are generally considered more readable and Pythonic; `map`/`filter` shine mainly when you already have a named function handy to pass directly."
      ),
      q(
        "What does `functools.partial` do?",
        "It creates a new callable with some of a function's arguments pre-filled — useful for adapting a general function to a more specific interface (e.g., turning `power(base, exponent)` into a `square` function)."
      ),
      q(
        "Why does Python's `sorted()` take a `key` function instead of a comparator?",
        "Key-based sorting computes a sort key for each element once (decorate-sort-undecorate internally) rather than calling a comparator O(n log n) times — it's both faster and easier to write correctly (e.g., `key=lambda p: (p.age, p.name)` for multi-field sorts)."
      ),
    ],
  },
  {
    id: "concurrency",
    title: "Concurrency & the GIL",
    questions: [
      q(
        "What is the GIL, and why does it matter?",
        "The Global Interpreter Lock — CPython only allows one thread to execute Python bytecode at a time, even on multi-core machines. It means threads don't give you true parallelism for CPU-bound work, which fundamentally shapes how concurrency is approached in Python."
      ),
      q(
        "Given the GIL, when do threads actually help in Python?",
        "For I/O-bound work — the GIL is released during blocking I/O (network, disk, sleeping), so other threads can run while one waits. Threads don't help CPU-bound work, where bytecode execution is serialized by the GIL."
      ),
      q(
        "How do you achieve real parallelism across CPU cores in Python?",
        "Use `multiprocessing` (or `concurrent.futures.ProcessPoolExecutor`) — each process gets its own Python interpreter and its own GIL, so they can run on separate cores simultaneously. The tradeoff is heavier startup cost and the need for inter-process communication instead of shared memory."
      ),
      q(
        "How does `asyncio` achieve concurrency without threads?",
        "Via cooperative multitasking on a single thread: an event loop runs many coroutines, each voluntarily yielding control at `await` points (typically while waiting on I/O), so others can run in the meantime — sidestepping the GIL entirely for I/O-bound work."
      ),
      q(
        "What is a race condition, and how do you prevent one in threaded code?",
        "A bug where the outcome depends on the unpredictable timing/interleaving of concurrent operations on shared state — e.g., two threads doing a read-modify-write on the same counter and losing an update. `threading.Lock` (and related primitives) serialize access to the shared resource to prevent it."
      ),
    ],
  },
  {
    id: "memory",
    title: "Memory model & garbage collection",
    questions: [
      q(
        "How does CPython primarily manage memory?",
        "Through reference counting: each object tracks how many references point to it, and is deallocated immediately when that count drops to zero — giving CPython fairly deterministic cleanup compared to purely tracing garbage collectors."
      ),
      q(
        "If CPython uses reference counting, why does it also need a garbage collector?",
        "Reference counting alone can't reclaim *reference cycles* — groups of objects that reference each other but are unreachable from the rest of the program. CPython's generational cyclic garbage collector (`gc` module) periodically detects and frees these."
      ),
      q(
        "What is a `weakref`, and when would you use one?",
        "A reference to an object that doesn't increase its reference count — useful for caches, observer patterns, and deliberately breaking reference cycles (e.g., a child object holding a weak reference back to its parent)."
      ),
      q(
        "Why might `a is b` be `True` for two separately-written integer literals like `100`?",
        "CPython caches small integers (commonly -5 to 256) as singletons for performance, so separate references to the same small integer often point to the same object. This is an implementation detail you should never rely on — use `==` for value comparison."
      ),
    ],
  },
  {
    id: "type-hints",
    title: "Type hints & typing",
    questions: [
      q(
        "Are type hints enforced at runtime?",
        "No. They're optional metadata, primarily useful for static analysis tools (`mypy`, `pyright`), IDEs, and documentation. Python remains dynamically typed and will run code that violates its own annotations without complaint."
      ),
      q(
        "What does `Optional[str]` mean, and what's the modern equivalent?",
        "`Optional[str]` is shorthand for `Union[str, None]` — 'a string, or `None`'. The modern (3.10+) syntax is `str | None`."
      ),
      q(
        "What is `typing.Protocol` used for?",
        "Defining structural ('duck') types — interfaces based on what methods/attributes an object has, not on inheritance. Any object with a matching shape satisfies the protocol, and static type checkers can verify this without requiring an explicit subclass relationship."
      ),
      q(
        "What tool actually checks type hints for correctness?",
        "A separate static type checker — most commonly `mypy` or `pyright` — run as a linting step. Python itself never validates annotations at runtime."
      ),
    ],
  },
  {
    id: "testing",
    title: "Testing",
    questions: [
      q(
        "What's the main philosophical difference between `unittest` and `pytest`?",
        "`unittest` is class-based with `assertX` methods (Java-JUnit-style, included in the standard library); `pytest` favors plain `assert` statements (with rich introspection on failure), function-based tests, fixtures for composable setup, and `parametrize` for data-driven tests — generally producing terser, more readable suites."
      ),
      q(
        "What is a pytest fixture?",
        "A reusable piece of setup (and optional teardown) code, declared with `@pytest.fixture` and injected into tests simply by naming it as a parameter — pytest resolves and provides it automatically."
      ),
      q(
        "What does `@pytest.mark.parametrize` let you avoid?",
        "Writing many near-identical test functions that differ only in their input/expected-output values — instead, you declare the test logic once and supply a table of cases to run it against."
      ),
      q(
        "Why mock external dependencies in tests rather than hitting them directly?",
        "To make tests fast, deterministic, and independent of systems you don't control (networks, databases, the clock) — and to isolate and verify *your* logic rather than incidentally testing the dependency itself."
      ),
    ],
  },
  {
    id: "performance",
    title: "Performance & pitfalls",
    questions: [
      q(
        "What's the right first step when code is 'too slow'?",
        "Profile it (`cProfile`, `timeit`, `line_profiler`) to find the *actual* bottleneck before changing anything — intuition about what's slow is frequently wrong, and optimizing the wrong part wastes effort and risks introducing bugs."
      ),
      q(
        "Why does `0.1 + 0.2 == 0.3` evaluate to `False`?",
        "Binary floating-point can't exactly represent most decimal fractions, so `0.1 + 0.2` is actually a value extremely close to, but not exactly equal to, `0.3`. Use `math.isclose()` for tolerant comparisons."
      ),
      q(
        "Why does `[lambda: i for i in range(3)]` produce three functions that all return `2`?",
        "Closures capture variables by reference, not by value — by the time the lambdas are called, the loop has finished and `i` is `2` for all of them. The fix is to capture the current value via a default argument: `lambda i=i: i`."
      ),
      q(
        "Why is modifying a list while iterating over it dangerous?",
        "Removing or inserting elements shifts subsequent indices, so the iterator can skip elements or revisit them — producing subtly wrong results without raising an error. Iterate over a copy (`for x in items[:]`) or build a new filtered list/comprehension instead."
      ),
    ],
  },
  {
    id: "stdlib",
    title: "Standard library",
    questions: [
      q(
        "What does `collections.Counter` do?",
        "A `dict` subclass specialized for counting hashable items — `Counter(\"mississippi\")` instantly gives you per-character frequencies, plus convenience methods like `.most_common(n)`."
      ),
      q(
        "What does `collections.defaultdict` solve?",
        "It eliminates repetitive 'check if the key exists, else initialize it' boilerplate — accessing a missing key auto-creates a default value (via a factory function you supply, e.g. `list` or `int`) instead of raising `KeyError`."
      ),
      q(
        "Why is `collections.deque` preferred over a `list` for queue-like operations?",
        "`deque` supports O(1) appends and pops from *both* ends, whereas `list.insert(0, x)` and `list.pop(0)` are O(n) because every other element has to shift."
      ),
      q(
        "What's the advantage of `pathlib.Path` over building paths with string concatenation or `os.path`?",
        "An object-oriented, cross-platform API where paths compose naturally with `/`, plus built-in methods for globbing, reading/writing, and inspecting metadata — generally clearer and less error-prone than manual string munging."
      ),
      q(
        "Why should you avoid unpickling data from an untrusted source?",
        "`pickle.loads` can execute arbitrary code as part of deserialization — it's a serious security liability for any data you don't fully control. Use `json` (or another safe interchange format) for untrusted or cross-system data."
      ),
    ],
  },
];

export const totalRapidFireCount = rapidFireCategories.reduce(
  (sum, category) => sum + category.questions.length,
  0
);
