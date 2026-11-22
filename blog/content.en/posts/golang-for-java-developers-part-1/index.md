---
title: "Golang for Java Developers: part 1"
slug: golang-for-java-developers-part-1
date: 2022-07-17T15:17:56Z
lastmod: 2022-07-19T11:37:16Z
tags: ["go", "java"]
summary: "This article shows some features of the Go language from the perspective of a Java developer..."
translatedFrom: pt
devto:
  id: 995475
  url: https://dev.to/enoqueleal/golang-for-java-developers-part-1--3a5n
---

{{< translated-from >}}

The goal of this article is to show some features of the Go language from the perspective of a Java developer. To keep the reading from getting too tiring, I will split this article into a few parts, and this is part 1.

I have been working in software development for more than a decade, and along the way I had the opportunity to work with and get to know many compiled and interpreted programming languages, as well as many technologies and frameworks. Still, Java is the language that has been most present throughout this journey. Because of that, I consider Java my main programming language.

I was recently invited to join a project where my task was to take an application that had been built in Java and rewrite it in Go, following an _As Is / To Be_ model.

NOTE: Justifying why that decision was made is outside the scope of this article. What I can share is that the project was quite strategic, and the application's startup time was very important.

After a few _benchmarks_, _Golang_ showed a very satisfying startup time, as well as an easy-to-use _multithreading_ mechanism based on its _goroutines_.

With this brief context, I want to share some impressions of this fabulous language from the perspective of a Java dev.

---

**Let's start**

_Main class_

Basic structure of the main class written in Go:

```

package main

import “fmt”

func main() {

    fmt.Println(“Hello, world!”)

}

```

Equivalent implementation in Java:

```

public class MainClass {

    public static void main(String [] args) {

        System.out.println(“Hello, world”);

    }
}

```


We can notice some similarities between the two implementations, but let's focus on the differences between them:

**1**) Go does not require semicolons;

**2**) The Go implementation only declares functions, with no class name declaration, which gives the impression that in Go we work only with function scope and not class scope.

_**NOTE**: This is not entirely untrue, but we will talk about it later;_

**3**) Explicitly declaring the function's visibility with reserved words such as public, protected or private is not necessary;

**4**) An import in Go refers only to the package name, not to a class name.

Some of the points above felt quite strange to me at first, while others delighted me with the design of the language. After all, why should we be forced to put a semicolon at the end of a variable declaration or a function call? lol

In the next part I will bring a few more interesting points. See you soon!
