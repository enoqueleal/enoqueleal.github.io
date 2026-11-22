---
title: "Monolith: villain or hero?"
slug: monolith-villain-or-hero
date: 2023-07-31T12:42:41Z
lastmod: 2023-07-31T12:46:11Z
tags: ["architecture", "microservices"]
summary: "Microservices are not a silver bullet, and the monolith is not the villain. Drawing on Sam Newman's and Martin Fowler's definitions, I invite you to think twice before migrating, so you don't end up with distributed monoliths and unnecessary costs."
translatedFrom: pt
devto:
  id: 1554716
  url: https://dev.to/enoqueleal/monolito-vilao-ou-mocinho-52el
---

{{< translated-from >}}

We hear a lot about microservices: modular, independent applications that have their own data store, that are self-sufficient, have high cohesion and low coupling, that can be deployed independently of other components and that are also easy to scale.

My provocation here is: why is the monolith the villain? Why are microservices the best option?

Why did you decide to migrate from a monolithic architecture to a "microservices" architecture?

Have you been through a migration from a monolithic architecture to a microservices architecture? If so, were the advantages this architectural model supposedly offers actually achieved, or were only new problems created, such as: difficulties integrating and orchestrating communication between the new services, a lot of business rules duplicated across different components, an unsustainable number of software components and, last but not least, a waste of your computing resources?

Do you know how many software assets are running in your production environment today? And, if you do, are all those applications really necessary for your business or product to work? Or are you just wasting your money, or your employer's? Yes, keeping an application running costs money, whether in your on-premises datacenter or in any cloud provider, on any kind of infrastructure. It costs money, and that becomes very clear when we use on-demand infrastructure provisioning, through the famous bill.

![Meme: a cat in the foreground with the caption “me, accidentally calling a Lambda function recursively”, while a man labeled AWS plays a drum labeled “my AWS bill”, with dollar signs growing from $ to $$$$](image-1.jpg)

These are just some questions I wanted to raise to invite you to reflect on some decisions that were made, not necessarily by you, of course, but by anyone who at some point sat in the chair of architect, engineer, manager or whatever the role, and who made this decision prematurely, and who is now most likely no longer among your coworkers and is probably out there making this kind of decision at other companies without weighing the consequences.

But every decision has its consequences, right? And now we have to deal with them. lol

The tech market suffers from a shortage of professionals, that is a fact. There is a lot of demand and few qualified people to meet it, which opens the door for opportunists who call themselves software architecture gurus and who end up with room to make decisions that are often questionable.

Well, here we go: with all the provocation done, let's get some context on what a monolithic system is. **Sam Newman**, in his book *“Monolith to Microservices”*, defines three types of monolithic systems:

**Single-process monolith**: all the code is contained in a single process.

**Modular monolith**: a variation of the single-process monolith. In a modular monolith, it is possible to work on each module independently, but these modules still have to be combined for deployment.

**Distributed monolith**: a system made up of several services, but for some reason the system as a whole has to be deployed together.

I particularly like these definitions, and I have come across these different types of monoliths throughout my career as a developer. The fact is that everything is tightly coupled.

Okay, and what about microservices? Alright, here we go.

In the same book, *Newman* defines microservices as **independently** deployable services modeled around a business domain.

The iconic **Martin Fowler** wrote a post on his personal blog in mid-2014 with the following title: *Microservices: a definition of this new architectural term*.

*Fowler* described microservices as an approach to developing a single application as a suite of small services, each running in its own process and communicating with lightweight mechanisms, often an HTTP resource API. These services are built around business capabilities and are independently deployable by fully automated deployment machinery.

This architectural model gained a lot of attention in the software development and architecture community, so what is the problem? The problem is romanticizing these concepts. You and/or your company are not *Netflix, Google or Facebook*. Microservices are not a silver bullet and the monolith is not a villain, so don't romanticize it. A company can absolutely have a monolithic application with good scalability, low coupling and high cohesion; it all depends on how that monolithic application was built and structured. In the same way, breaking into components an application that contains a tangle of bad, highly coupled code with low cohesion will not make it more scalable and cohesive. You will only get new problems and spend more money.

I am not here to say that microservices are bad, far from it. I only ask that you carefully analyze the context you are in and the problem you need to solve, so you can make the best decision. If you don't, you will just be creating new distributed monoliths and increasing the complexity of your software assets, and in the long run that will cost much more than you can imagine.

______________________________________________________________

References:

FOWLER, M. **Microservices: a definition of this new architectural term**. martinFowler.com, Mar. 25, 2014. Available at: <https://martinfowler.com/articles/microservices.html>. Accessed on: Aug. 10, 2021.

NEWMAN, S. **Migrando sistemas monolíticos para microsserviços**: Padrões evolutivos para transformar seu sistema monolítico. São Paulo: Novatec, 2020. (Brazilian edition of *Monolith to Microservices: Evolutionary Patterns to Transform Your Monolith*, O'Reilly, 2019.)
