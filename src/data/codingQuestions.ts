export type Difficulty = "Easy" | "Medium" | "Hard";

export interface CodingExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface CodingQuestion {
  id: string;
  title: string;
  difficulty: Difficulty;
  topic: string;
  problem: string;
  examples: CodingExample[];
  hints: string[];
  solution: string;
  explanation: string;
  time: string;
  space: string;
}

export const codingQuestions: CodingQuestion[] = [
  {
    id: "cq-reverse-string",
    title: "Reverse a string",
    difficulty: "Easy",
    topic: "Strings",
    problem:
      "Write a function that reverses a string. Then explain at least two different ways to do it in Python, and discuss the trade-offs.",
    examples: [
      { input: '"interview"', output: '"weivretni"' },
      { input: '""', output: '""' },
    ],
    hints: [
      "Python strings support extended slicing — what does a negative step do?",
      "Could you also solve it with `reversed()` and `str.join`? How would the performance compare?",
    ],
    solution: `def reverse_string(s: str) -> str:
    return s[::-1]


# Alternative using reversed() + join — useful when you want to
# show you understand that strings are immutable and iterables of
# characters can be re-assembled with str.join:
def reverse_string_alt(s: str) -> str:
    return "".join(reversed(s))`,
    explanation:
      "Slicing with a step of -1 (`s[::-1]`) walks the string backwards and builds a new string in one C-level operation — it's the idiomatic, fastest approach. `reversed(s)` returns a lazy reverse iterator over the characters, and `str.join` assembles them into a new string in O(n); it's a good 'second way' to demonstrate that you know strings are immutable sequences and that `str.join` is the efficient way to build a string from pieces (see the note on string concatenation in the Concepts guide).",
    time: "O(n) — every character is visited once",
    space: "O(n) — a new string of the same length is created (strings are immutable)",
  },
  {
    id: "cq-fizzbuzz",
    title: "FizzBuzz",
    difficulty: "Easy",
    topic: "Control flow",
    problem:
      "Print the numbers from 1 to n. For multiples of 3, print 'Fizz' instead; for multiples of 5, print 'Buzz'; for multiples of both, print 'FizzBuzz'.",
    examples: [
      {
        input: "n = 15",
        output:
          "1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz",
      },
    ],
    hints: [
      "Check the 'divisible by both' case before the individual cases — or build the output by concatenation so order doesn't matter.",
      "Can you avoid repeating the divisibility logic for 3 and 5?",
    ],
    solution: `def fizzbuzz(n: int) -> list[str]:
    result = []
    for i in range(1, n + 1):
        out = ""
        if i % 3 == 0:
            out += "Fizz"
        if i % 5 == 0:
            out += "Buzz"
        result.append(out or str(i))
    return result`,
    explanation:
      "The classic pitfall is checking `i % 3 == 0`, then `i % 5 == 0`, then `i % 15 == 0` as separate branches — which never reaches the FizzBuzz case because the first two `elif`s already matched. Building the output by *concatenation* sidesteps the ordering problem entirely: a multiple of 15 naturally accumulates both 'Fizz' and 'Buzz'. The `out or str(i)` at the end leans on Python's truthiness (an empty string is falsy) to fall back to the number when neither condition matched — a small but telling idiom.",
    time: "O(n) — one pass over the range",
    space: "O(n) — for the returned list (O(1) extra if you print directly instead)",
  },
  {
    id: "cq-valid-palindrome",
    title: "Check if a string is a palindrome",
    difficulty: "Easy",
    topic: "Strings",
    problem:
      "Given a string, determine whether it reads the same forwards and backwards, ignoring case, spaces, and punctuation.",
    examples: [
      { input: '"A man, a plan, a canal: Panama"', output: "True" },
      { input: '"race a car"', output: "False" },
    ],
    hints: [
      "Normalize first: lowercase the string and keep only alphanumeric characters.",
      "Once normalized, how does this relate to the 'reverse a string' problem?",
    ],
    solution: `def is_palindrome(s: str) -> bool:
    cleaned = [ch.lower() for ch in s if ch.isalnum()]
    return cleaned == cleaned[::-1]`,
    explanation:
      "The trick is separating *normalization* (case-folding, stripping non-alphanumeric characters) from the *palindrome check* itself — once you've reduced the input to a clean list of characters, the check is identical to reversing a sequence and comparing. `str.isalnum()` filters out spaces and punctuation in one readable pass, and comparing a list to its reverse (`cleaned == cleaned[::-1]`) is both correct and easy to read. A two-pointer approach (`left`/`right` indices walking inward) achieves the same result with O(1) extra space and is worth mentioning as a follow-up optimization.",
    time: "O(n) — one pass to clean, one (amortized) to compare",
    space: "O(n) — for the cleaned list/reversed copy",
  },
  {
    id: "cq-two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Hashing",
    problem:
      "Given a list of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. Assume exactly one solution exists, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "nums[0] + nums[1] == 2 + 7 == 9",
      },
    ],
    hints: [
      "The brute-force nested loop is O(n²) — what data structure gives you O(1) average lookups?",
      "For each number, what's the *complement* you'd need to have already seen?",
    ],
    solution: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}   # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    raise ValueError("No two numbers sum to the target")`,
    explanation:
      "The naive solution checks every pair — O(n²). The one-pass hash-map trick processes each number once: for the *current* number, compute the complement that would be needed to reach `target`, and check whether you've *already* seen it (stored with its index in a dict). Dict lookups are O(1) average, so the whole algorithm collapses to a single O(n) pass. This is the canonical example of trading space for time, and of recognizing 'I need fast membership/lookup' as the cue to reach for a `dict` or `set`.",
    time: "O(n) — a single pass with O(1) average dict operations",
    space: "O(n) — the hash map can hold up to n entries",
  },
  {
    id: "cq-valid-anagram",
    title: "Valid anagram",
    difficulty: "Easy",
    topic: "Hashing",
    problem:
      "Given two strings, determine whether the second is an anagram of the first (uses exactly the same characters, with the same frequency, in any order).",
    examples: [
      { input: 's = "listen", t = "silent"', output: "True" },
      { input: 's = "rat", t = "car"', output: "False" },
    ],
    hints: [
      "What do two anagrams look like once you sort their characters?",
      "Could `collections.Counter` give you an even more direct comparison — and what's its complexity relative to sorting?",
    ],
    solution: `from collections import Counter

def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    return Counter(s) == Counter(t)


# Equivalent, sorting-based approach (O(n log n) instead of O(n)):
def is_anagram_sorted(s: str, t: str) -> bool:
    return sorted(s) == sorted(t)`,
    explanation:
      "Sorting both strings and comparing is a perfectly correct O(n log n) solution and a fine first answer. The sharper one recognizes that an anagram check is really a *frequency comparison*: build a character-count map for each string and compare them — `collections.Counter` does exactly this and supports direct equality comparison, getting you to O(n). This is a good moment to mention the length pre-check (`len(s) != len(t)`), which short-circuits the obvious mismatch case before doing any real work.",
    time: "O(n) with `Counter` (O(n log n) with the sorting approach)",
    space: "O(k) — where k is the size of the character alphabet (effectively O(1) for ASCII)",
  },
  {
    id: "cq-group-anagrams",
    title: "Group anagrams",
    difficulty: "Medium",
    topic: "Hashing",
    problem:
      "Given a list of strings, group the anagrams together. Return the groups in any order.",
    examples: [
      {
        input: '["eat", "tea", "tan", "ate", "nat", "bat"]',
        output: '[["eat","tea","ate"], ["tan","nat"], ["bat"]]',
      },
    ],
    hints: [
      "What value could you compute from a string such that all of its anagrams produce the *same* value — a key you could group by?",
      "`collections.defaultdict` removes the 'check if the key exists first' boilerplate.",
    ],
    solution: `from collections import defaultdict

def group_anagrams(strs: list[str]) -> list[list[str]]:
    groups: dict[tuple[str, ...], list[str]] = defaultdict(list)
    for word in strs:
        key = tuple(sorted(word))    # anagrams sort to the same character sequence
        groups[key].append(word)
    return list(groups.values())`,
    explanation:
      "The key insight is choosing a *canonical form* that's identical for every anagram of a given word — sorting a word's characters does exactly that ('eat', 'tea', and 'ate' all sort to ('a','e','t')). That canonical form becomes a dict key, and `defaultdict(list)` lets you append to a group without first checking whether the key exists. An alternative canonical form is a 26-element character-count tuple, which avoids the O(k log k) sort per word in exchange for a fixed-size counting pass — worth mentioning as a follow-up optimization for long words over a small alphabet.",
    time: "O(n · k log k) — n words, each sorted in O(k log k) where k is word length",
    space: "O(n · k) — storing every word, grouped, plus the keys",
  },
  {
    id: "cq-find-duplicates",
    title: "Find all duplicates in a list",
    difficulty: "Easy",
    topic: "Hashing",
    problem:
      "Given a list of integers, return a list of the elements that appear more than once (each duplicated value should appear only once in the output).",
    examples: [
      { input: "[4, 3, 2, 7, 8, 2, 3, 1]", output: "[3, 2]" },
    ],
    hints: [
      "What container gives you O(1) average membership testing, so you can recognize 'I've seen this before' instantly?",
      "How do you avoid adding the same duplicate to your result more than once?",
    ],
    solution: `def find_duplicates(nums: list[int]) -> list[int]:
    seen: set[int] = set()
    duplicates: set[int] = set()
    for num in nums:
        if num in seen:
            duplicates.add(num)
        else:
            seen.add(num)
    return list(duplicates)


# A common one-liner using collections.Counter, trading clarity of
# intent for slight verbosity in the filter:
from collections import Counter

def find_duplicates_counter(nums: list[int]) -> list[int]:
    return [num for num, count in Counter(nums).items() if count > 1]`,
    explanation:
      "The brute-force approach checks each element against every other — O(n²). The set-based approach is the natural upgrade: walk the list once, and use a `set` to track values you've already encountered (O(1) average membership test); the moment you see a value twice, record it in a *second* set so each duplicate appears only once in the output, regardless of how many times it repeats. `Counter` expresses the same idea even more directly — 'count everything, then keep what appears more than once' — at the cost of one extra full pass over the counts.",
    time: "O(n) — a single pass with O(1) average set operations",
    space: "O(n) — for the `seen` and `duplicates` sets",
  },
  {
    id: "cq-flatten-nested-list",
    title: "Flatten a nested list",
    difficulty: "Medium",
    topic: "Recursion",
    problem:
      "Write a function that takes an arbitrarily nested list (lists containing lists containing lists, to any depth) and returns a single flat list of all the non-list elements, in order.",
    examples: [
      {
        input: "[1, [2, [3, 4], 5], [[6]], 7]",
        output: "[1, 2, 3, 4, 5, 6, 7]",
      },
    ],
    hints: [
      "What's the base case — an element that *isn't* a list?",
      "Could you write this without recursion, using an explicit stack? What would the trade-offs be?",
    ],
    solution: `from collections.abc import Iterable

def flatten(items) -> list:
    result = []
    for item in items:
        if isinstance(item, list):
            result.extend(flatten(item))   # recurse into the nested list
        else:
            result.append(item)
    return result


# Generator version — lazy, and avoids building intermediate lists:
def flatten_lazy(items):
    for item in items:
        if isinstance(item, list):
            yield from flatten_lazy(item)
        else:
            yield item`,
    explanation:
      "This is a textbook recursion problem: the base case is 'this element is not a list — emit it'; the recursive case is 'this element is a list — flatten *it*, and splice its results into ours'. `list.extend` (rather than `append`) is what splices the recursive result in rather than nesting it one level deeper. The generator version (`yield from`, from the Concepts guide's section on generators) is an elegant way to show you can express the same recursive structure lazily, without materializing intermediate lists at every level — particularly valuable for very deep or large structures.",
    time: "O(n) — every element is visited exactly once, where n is the total element count across all levels",
    space: "O(d) — recursion depth proportional to maximum nesting depth d, plus O(n) for the output",
  },
  {
    id: "cq-merge-intervals",
    title: "Merge overlapping intervals",
    difficulty: "Medium",
    topic: "Sorting",
    problem:
      "Given a list of intervals `[start, end]`, merge all overlapping intervals and return a list of the non-overlapping intervals that cover all the input intervals.",
    examples: [
      {
        input: "[[1,3], [2,6], [8,10], [15,18]]",
        output: "[[1,6], [8,10], [15,18]]",
        explanation: "[1,3] and [2,6] overlap, and merge into [1,6]",
      },
    ],
    hints: [
      "If the intervals were sorted by start time, could you process them with a single pass, merging as you go?",
      "Two intervals `[a, b]` and `[c, d]` (with `a <= c`) overlap exactly when...?",
    ],
    solution: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    if not intervals:
        return []

    intervals.sort(key=lambda interval: interval[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        last_end = merged[-1][1]
        if start <= last_end:               # overlaps the last merged interval
            merged[-1][1] = max(last_end, end)
        else:
            merged.append([start, end])

    return merged`,
    explanation:
      "Sorting by start time is what turns an apparently-quadratic 'compare every pair' problem into a single linear sweep: once sorted, you only ever need to compare each interval against the *most recently merged* one — if the new interval's start is at or before the last merged interval's end, they overlap and you extend the end (taking the max, since the new interval might be entirely contained within the old one); otherwise, it starts a new group. This 'sort, then single pass with a running result' shape recurs across a huge number of interval and scheduling problems.",
    time: "O(n log n) — dominated by the sort; the merge pass itself is O(n)",
    space: "O(n) — for the sorted copy and the result (O(log n) to O(n) extra for the sort itself, depending on implementation)",
  },
  {
    id: "cq-longest-substring",
    title: "Longest substring without repeating characters",
    difficulty: "Medium",
    topic: "Sliding window",
    problem:
      "Given a string, find the length of the longest substring that contains no repeating characters.",
    examples: [
      { input: '"abcabcbb"', output: "3", explanation: 'The answer is "abc"' },
      { input: '"bbbbb"', output: "1", explanation: 'The answer is "b"' },
      { input: '"pwwkew"', output: "3", explanation: 'The answer is "wke"' },
    ],
    hints: [
      "The brute-force approach checks every substring — O(n³) or worse. Could you maintain a 'window' of characters and slide it along?",
      "When you encounter a character already in your window, how far do you need to shrink the window from the left?",
    ],
    solution: `def length_of_longest_substring(s: str) -> int:
    last_seen: dict[str, int] = {}
    window_start = 0
    longest = 0

    for i, ch in enumerate(s):
        if ch in last_seen and last_seen[ch] >= window_start:
            window_start = last_seen[ch] + 1   # jump the window past the repeat
        last_seen[ch] = i
        longest = max(longest, i - window_start + 1)

    return longest`,
    explanation:
      "This is the canonical *sliding window* problem. Instead of re-examining every substring, maintain a window `[window_start, i]` that always contains unique characters, and a dict mapping each character to the index where it was last seen. When the current character was last seen *inside* the current window, jump `window_start` to just past that previous occurrence — shrinking the window in O(1) rather than re-scanning. Each index is visited a constant number of times overall, which is what gets this down from a naive O(n²)/O(n³) to a single O(n) pass — recognizing 'sliding window' as the shape of a problem is one of the highest-leverage pattern-matching skills for these kinds of questions.",
    time: "O(n) — each character is processed a constant number of times",
    space: "O(min(n, alphabet size)) — for the `last_seen` map",
  },
  {
    id: "cq-binary-search",
    title: "Binary search",
    difficulty: "Easy",
    topic: "Algorithms",
    problem:
      "Given a sorted list of distinct integers and a target value, return the index of the target if it exists, or -1 if it doesn't — without scanning the whole list.",
    examples: [
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 9", output: "4" },
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 2", output: "-1" },
    ],
    hints: [
      "Sortedness means you can discard half the search space with each comparison — what should you compare the target against?",
      "Be careful with the loop's termination condition and how you update the bounds — off-by-one errors are the classic trap here.",
    ],
    solution: `def binary_search(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1

    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1

    return -1`,
    explanation:
      "Binary search is the textbook example of using a *known property of the data* — here, sortedness — to eliminate half the remaining possibilities with every comparison, achieving logarithmic rather than linear time. The classic interview traps are loop-condition off-by-ones (`lo <= hi`, not `lo < hi`, since a single-element range must still be checked) and bound updates (`mid + 1` / `mid - 1`, not `mid`, to guarantee the search space shrinks and the loop terminates). It's also worth knowing that `bisect.bisect_left`/`bisect_right` in the standard library implement this for you in production code.",
    time: "O(log n) — the search space halves each iteration",
    space: "O(1) — only a few index variables are used",
  },
  {
    id: "cq-valid-parentheses",
    title: "Valid parentheses",
    difficulty: "Easy",
    topic: "Stacks",
    problem:
      "Given a string containing just the characters `(`, `)`, `{`, `}`, `[`, and `]`, determine whether the brackets are properly matched and nested.",
    examples: [
      { input: '"()[]{}"', output: "True" },
      { input: '"(]"', output: "False" },
      { input: '"([)]"', output: "False" },
      { input: '"{[]}"', output: "True" },
    ],
    hints: [
      "Which data structure naturally models 'the most recently opened bracket must be the next one closed'?",
      "What should happen if you encounter a closing bracket and the stack is empty — or its top doesn't match?",
    ],
    solution: `def is_valid(s: str) -> bool:
    pairs = {")": "(", "]": "[", "}": "{"}
    stack: list[str] = []

    for ch in s:
        if ch in pairs.values():            # an opening bracket
            stack.append(ch)
        elif ch in pairs:                   # a closing bracket
            if not stack or stack.pop() != pairs[ch]:
                return False
        # any other character is ignored in this simplified version

    return not stack                        # every opener must have been closed`,
    explanation:
      "The 'most recent opener must be the next one closed' rule is precisely Last-In-First-Out behavior — exactly what a stack provides (and Python lists give you for free via `append`/`pop`). Push every opening bracket; on a closing bracket, it must match whatever's on *top* of the stack (the most recently opened, still-unclosed bracket) — if the stack is empty or the top doesn't match, the string is invalid immediately. The final, easy-to-forget check: the stack must be completely *empty* at the end, or there's an opener that was never closed.",
    time: "O(n) — one pass over the string, each character pushed/popped at most once",
    space: "O(n) — worst case (e.g. all opening brackets), the stack holds every character",
  },
  {
    id: "cq-memoize-decorator",
    title: "Write your own memoizing decorator",
    difficulty: "Medium",
    topic: "Decorators",
    problem:
      "Implement a decorator `@memoize` that caches a function's return values, keyed by its arguments, so repeated calls with the same arguments return the cached result instead of recomputing it. Don't use `functools.lru_cache` — build the mechanism yourself.",
    examples: [
      {
        input: "@memoize\\ndef slow_square(n): ...\\nslow_square(5); slow_square(5)",
        output: "Second call returns instantly from the cache",
      },
    ],
    hints: [
      "What's a natural way to turn a function's positional and keyword arguments into a single hashable cache key?",
      "Don't forget `functools.wraps` — what would break without it?",
    ],
    solution: `import functools

def memoize(func):
    cache = {}

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        key = (args, tuple(sorted(kwargs.items())))
        if key not in cache:
            cache[key] = func(*args, **kwargs)
        return cache[key]

    wrapper.cache = cache          # exposed for inspection/clearing in tests
    return wrapper


@memoize
def slow_square(n):
    import time
    time.sleep(0.2)
    return n * n`,
    explanation:
      "This question tests several Concepts-guide ideas at once: a decorator is just `func = decorator(func)`; the closure over `cache` lets the wrapper persist state across calls (the cache survives because the wrapper function — and the dict it closes over — stays alive as long as the decorated name does); and the cache key must be *hashable*, which is why both `args` (already a tuple) and `kwargs` (a dict — unhashable!) need converting — sorting `kwargs.items()` into a tuple makes the key both hashable and order-independent. `functools.wraps` is what keeps `slow_square.__name__` and `__doc__` intact; without it, introspection and debugging tools would see a generic `wrapper`.",
    time: "O(1) for cached calls; original function's complexity for first-time calls",
    space: "O(k) — where k is the number of distinct argument combinations seen",
  },
  {
    id: "cq-context-manager",
    title: "Build a custom context manager",
    difficulty: "Medium",
    topic: "Context managers",
    problem:
      "Implement a context manager `suppress_and_log(*exception_types)` that, when used in a `with` block, catches any of the given exception types, logs them, and lets the program continue — without using the standard library's `contextlib.suppress`. Provide both a class-based and a generator-based implementation.",
    examples: [
      {
        input: "with suppress_and_log(KeyError):\\n    raise KeyError('missing')",
        output: "Exception is logged; program continues past the `with` block",
      },
    ],
    hints: [
      "Which dunder methods does the `with` statement rely on, and what does a truthy return from one of them mean?",
      "`contextlib.contextmanager` lets you express the same protocol with a generator and a single `yield` — what goes before vs. after it?",
    ],
    solution: `# --- Class-based version ---
class suppress_and_log:
    def __init__(self, *exception_types):
        self.exception_types = exception_types

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type is not None and issubclass(exc_type, self.exception_types):
            print(f"Suppressed {exc_type.__name__}: {exc_value}")
            return True       # truthy -> tells Python the exception is handled
        return False          # let any other exception propagate normally


# --- Generator-based version (contextlib.contextmanager) ---
from contextlib import contextmanager

@contextmanager
def suppress_and_log_gen(*exception_types):
    try:
        yield
    except exception_types as exc:
        print(f"Suppressed {type(exc).__name__}: {exc}")`,
    explanation:
      "The `with` statement is built on a small, precise protocol: `__enter__` runs on entry (its return value is what `as` binds to), and `__exit__(exc_type, exc_value, traceback)` *always* runs on exit — receiving exception details if one occurred, and able to suppress it by returning a truthy value. The class-based version implements that protocol directly and explicitly returns `True`/`False` to say 'handled' / 'not handled, propagate it'. The generator-based version expresses exactly the same idea more compactly: code before `yield` is `__enter__`, and wrapping the `yield` in `try/except` is `__exit__` — catching the listed exception types *is* suppressing them (no re-raise), while anything else propagates naturally out of the generator.",
    time: "O(1) — the context manager itself adds constant overhead per use",
    space: "O(1)",
  },
  {
    id: "cq-fib-generator",
    title: "Generate Fibonacci numbers lazily",
    difficulty: "Easy",
    topic: "Generators",
    problem:
      "Write a generator function `fibonacci()` that yields an infinite sequence of Fibonacci numbers (0, 1, 1, 2, 3, 5, 8, ...), one at a time, without ever materializing the whole sequence in memory. Then use it to get the first 10 values, and separately, the first value greater than 1000.",
    examples: [
      {
        input: "list(itertools.islice(fibonacci(), 10))",
        output: "[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]",
      },
    ],
    hints: [
      "An infinite `while True` loop is fine *inside* a generator — the caller controls how many values actually get produced.",
      "How would you take just the first n values, or stop at the first value matching a condition, without ever calling something like `list(fibonacci())`?",
    ],
    solution: `from itertools import islice, takewhile

def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b


first_ten = list(islice(fibonacci(), 10))
#  -> [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

first_over_1000 = next(x for x in fibonacci() if x > 1000)
#  -> 1597

under_1000 = list(takewhile(lambda x: x < 1000, fibonacci()))`,
    explanation:
      "This problem exists specifically to test whether you reach for *laziness* when a sequence is unbounded (or simply large): `list(fibonacci())` would hang forever trying to build an infinite list, but the generator only computes each value when asked for it, in O(1) memory. `itertools.islice` lazily takes a fixed number of values without consuming the rest of the (infinite) generator; a generator expression combined with `next()` lazily searches for the first value matching a predicate and stops immediately upon finding it; `itertools.takewhile` lazily consumes values *while* a condition holds and then stops. All three patterns — bounded slicing, find-first, and conditional consumption — are exactly the toolkit the Concepts guide's iterators-and-generators section sets up.",
    time: "O(1) per value produced — the generator does O(1) work to advance one step",
    space: "O(1) — only the last two values are ever held in memory, regardless of how far the sequence is consumed",
  },
  {
    id: "cq-word-frequency",
    title: "Top-k frequent words",
    difficulty: "Medium",
    topic: "Hashing & sorting",
    problem:
      "Given a list of words and an integer `k`, return the `k` most frequent words, ordered by frequency (descending), breaking ties alphabetically.",
    examples: [
      {
        input: 'words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 2',
        output: '["the", "is"]',
        explanation: '"the" appears 4 times, "is" appears 3 times — the two most frequent',
      },
    ],
    hints: [
      "What standard-library tool counts hashable items for you in one call?",
      "When sorting by multiple criteria with different orderings (frequency descending, word ascending), what trick lets you express both in a single sort key?",
    ],
    solution: `from collections import Counter

def top_k_frequent(words: list[str], k: int) -> list[str]:
    counts = Counter(words)
    # Sort by (-frequency, word): negating the count flips a descending
    # numeric sort into the ascending one Python's sort naturally performs,
    # so it composes cleanly with the alphabetical tie-breaker.
    ranked = sorted(counts, key=lambda word: (-counts[word], word))
    return ranked[:k]


# Counter also exposes this directly for the common case of "just give me
# the top k by frequency" (it doesn't apply the alphabetical tie-break):
def top_k_frequent_builtin(words: list[str], k: int) -> list[str]:
    return [word for word, _ in Counter(words).most_common(k)]`,
    explanation:
      "`collections.Counter` turns 'count occurrences of hashable items' into a one-line operation — recognizing that cue is half the problem. The more interesting half is the *composite sort key*: Python's `sorted` is always ascending, so to sort primarily by frequency *descending* and secondarily by word *ascending*, negate the numeric part of the key (`-counts[word]`) — now both components sort ascending, and tuples compare lexicographically, giving you exactly the desired order in a single `sorted` call. `Counter.most_common(k)` is the convenient built-in shortcut for the frequency-only case, useful to mention as 'and in real code, I'd reach for this directly.'",
    time: "O(n + m log m) — n to count, m distinct words to sort",
    space: "O(m) — for the counts and the ranked list",
  },
  {
    id: "cq-lru-cache",
    title: "Implement an LRU cache",
    difficulty: "Hard",
    topic: "Data structures & OOP",
    problem:
      "Design a Least-Recently-Used (LRU) cache with a fixed capacity. It should support `get(key)` (return the value, or -1 if absent, and mark the key as recently used) and `put(key, value)` (insert or update a value; if inserting exceeds capacity, evict the least-recently-used entry first). Both operations must run in O(1) average time.",
    examples: [
      {
        input:
          "cache = LRUCache(2)\\ncache.put(1,1); cache.put(2,2)\\ncache.get(1)      # 1, and 1 becomes most-recent\\ncache.put(3,3)    # capacity exceeded -> evicts key 2 (least recently used)\\ncache.get(2)      # -1 (evicted)",
        output: "1, then -1",
      },
    ],
    hints: [
      "You need both O(1) lookup by key *and* O(1) tracking of usage order — what single data structure, when ordered, gives you both?",
      "In Python 3.7+, what guarantee does a regular `dict` make about ordering — and which of its methods let you move or remove entries from either end in O(1)?",
    ],
    solution: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self._data: OrderedDict[int, int] = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self._data:
            return -1
        self._data.move_to_end(key)   # mark as most-recently-used
        return self._data[key]

    def put(self, key: int, value: int) -> None:
        if key in self._data:
            self._data.move_to_end(key)
        self._data[key] = value
        if len(self._data) > self.capacity:
            self._data.popitem(last=False)   # evict the least-recently-used (front)`,
    explanation:
      "The crux is realizing you need *two* properties simultaneously: O(1) lookup by key (a hash map) and O(1) tracking/reordering of recency (which a plain hash map can't do). `OrderedDict` gives you both in one structure — it's a dict that also maintains and lets you manipulate insertion order in O(1): `move_to_end(key)` promotes an entry to 'most recently used', and `popitem(last=False)` evicts from the *front* (the least-recently-used end) in O(1). (Worth mentioning: since Python 3.7 a regular `dict` preserves insertion order too, but it lacks `move_to_end`/`popitem(last=False)`, which is exactly why `OrderedDict` — or a hand-rolled doubly linked list plus hash map, the 'from scratch' version of this same idea — is the right structure here.) This question is really testing whether you can decompose 'O(1) get and put with eviction' into 'a structure that is simultaneously a hash map and an ordered list.'",
    time: "O(1) average for both `get` and `put`",
    space: "O(capacity) — the cache never holds more than `capacity` entries",
  },
  {
    id: "cq-quicksort",
    title: "Implement quicksort",
    difficulty: "Medium",
    topic: "Algorithms",
    problem:
      "Implement the quicksort algorithm to sort a list of integers in ascending order. Explain its average- and worst-case time complexity, and why a 'pick a random pivot' strategy matters in practice.",
    examples: [
      { input: "[3, 6, 8, 10, 1, 2, 1]", output: "[1, 1, 2, 3, 6, 8, 10]" },
    ],
    hints: [
      "Quicksort is a 'divide and conquer' algorithm — what are the three pieces it partitions the data into around a chosen pivot?",
      "What input would make a 'always pick the first element as pivot' strategy perform badly?",
    ],
    solution: `import random

def quicksort(items: list[int]) -> list[int]:
    if len(items) <= 1:
        return items

    pivot = random.choice(items)
    less    = [x for x in items if x < pivot]
    equal   = [x for x in items if x == pivot]
    greater = [x for x in items if x > pivot]

    return quicksort(less) + equal + quicksort(greater)`,
    explanation:
      "This 'three-list partition' formulation trades a little extra memory for clarity — it's an excellent way to *explain* quicksort precisely (and to get it correct under interview pressure) even though in-place partitioning is more memory-efficient and what production implementations use. The complexity story is the real point of this question: quicksort is O(n log n) on *average*, but degrades to O(n²) in the worst case — specifically when the chosen pivot is consistently the smallest or largest element (e.g., always picking the first element on already-sorted input, which is a common real-world data shape). Picking the pivot *randomly* (or via median-of-three) makes that worst case astronomically unlikely for any *particular* input, which is why `random.choice` here isn't a stylistic flourish — it's the difference between a robust algorithm and one with a predictable adversarial weakness. (And yes — in real code you'd just call `sorted()`, which uses Timsort, an O(n log n) *worst-case* hybrid sort; knowing when to implement an algorithm versus when to reach for the standard library is itself part of the answer.)",
    time: "O(n log n) average; O(n²) worst case (mitigated by random pivot selection)",
    space: "O(n) for this partition-based version (O(log n) auxiliary for an in-place version, from recursion depth)",
  },
];

export const totalCodingQuestionCount = codingQuestions.length;
