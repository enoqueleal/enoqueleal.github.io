---
title: "Monólito, vilão ou mocinho?"
date: 2023-07-31T12:42:41Z
lastmod: 2023-07-31T12:46:11Z
tags: ["arquitetura", "microsservicos"]
summary: "Microsserviços não são bala de prata e o monólito não é o vilão. A partir das definições de Sam Newman e Martin Fowler, convido você a refletir antes de migrar, para não criar monólitos distribuídos e custos desnecessários."
devto:
  id: 1554716
  url: https://dev.to/enoqueleal/monolito-vilao-ou-mocinho-52el
---

Muito se ouve falar sobre microsserviços, aplicações modulares e independentes, que possuem seu próprio repositório de dados, que são autossuficientes, possuem alta coesão, baixo acoplamento, que seu deploy seja feito de forma independente de outros componentes e que também seja fácil de escalar.

A minha provocação aqui é: porque o monólito é o vilão? Porque microsserviços é a melhor opção?

Porque você decidiu migrar de uma arquitetura monolítica para uma arquitetura de “microsserviços”?

Você vivenciou alguma migração de uma arquitetura monolítica para uma arquitetura de microsserviços? Se sim, as vantagens que esse modelo arquitetural supostamente oferece foram colhidas ou só foram criados novos problemas como por exemplo: dificuldades na integração e orquestração da comunicação entre os novos serviços, muita duplicidade de regras de negócios em diferentes componentes, um número insustentável de componentes de software e por fim, mas não menos importante um desperdício dos seus recursos computacionais?

Você sabe quantos ativos de software estão em execução no seu ambiente produtivo hoje? e, se souber, todas essas aplicações são realmente necessárias para o funcionamento do seu negócio ou produto? ou está apenas desperdiçando o seu dinheiro ou do seu empregador? Sim, manter uma aplicação no ar custa dinheiro, seja no seu datacenter on-premise ou em quaisquer cloud provider, utilizando qualquer tipo de infraestrutura. Isso custa dinheiro e fica muito evidente quando estamos utilizamos um provisionamento de infraestrutura sob demanda através do famoso billing.

![Meme: um gato em primeiro plano com a legenda “eu, chamando sem querer uma função Lambda recursivamente”, enquanto um homem identificado como AWS toca um tambor identificado como “minha conta da AWS”, com cifrões que aumentam de $ para $$$$](image-1.jpg)

Essas são só algumas questões que eu queria trazer à tona para te convidar a refletir a respeito de algumas decisões que foram tomadas, não necessariamente por você é claro, mas por qualquer pessoa que em algum momento ocupou a cadeira de arquiteto, engenheiro, gestor ou seja lá qual for o cargo, mas que tenha tomado essa decisão de forma prematura e que agora, muito provavelmente esta pessoa não se encontre mais entre seus colegas de trabalho e deve estar por aí tomando esse tipo de decisão em outras empresas sem medir as consequências.

Porém toda decisão tem suas consequências, não é mesmo? E agora temos que arcar com as mesmas. rs

O mercado de tecnologia sofre com uma escassez de profissionais, isso é um fato. Existe muita demanda e poucas pessoas capacitadas para atendê-la, o que abre precedentes para os aventureiros de plantão, que se autodenominam os gurus da arquitetura de software e que acabam tendo espaço para tomar decisões muitas das vezes questionáveis.

Bom, vamos lá, feito toda a provocação vamos a um pouco de contexto sobre o que é um sistema monolítico. **Sam Newman** em seu livro *“Migrando Sistemas Monolíticos para microsserviços”*, apresenta uma definição de que existem três tipos de sistemas monolíticos, sendo eles:

**Sistema monolítico de um só processo**: Todo o código está contido em um único processo.

**Sistema monolítico modular**: É uma variação do monolítico de um só processo. No monolítico modular, é possível trabalhar em cada módulo de forma independente, mas estes módulos ainda devem ser combinados na implantação.

**Sistema monolítico distribuído**: É um sistema composto de vários serviços, mas por algum motivo, o sistema como um todo deve ser implantado em conjunto.

Eu particularmente gosto bastante dessas definições e já me deparei com esses diferentes tipos de monólitos ao longo da minha carreira como desenvolvedor. O fato é que tudo está fortemente acoplado.

Ta e sobre microsserviços? Beleza, vamos lá.

*Newman* no mesmo livro define microsserviços como serviços que podem ser implantados de forma **independente**, e são modelados em torno de um domínio de negócio.

O icônico **Martin Fowler** escreveu em seu blog pessoal em meados de 2014 um post com o seguinte título: *Microservices: a definition of this new architectural term*.

*Fowler* descreveu microsserviços como uma abordagem para desenvolver um único aplicativo como um conjunto de pequenos serviços, cada um executando em seu próprio processo e se comunicando com mecanismos leves, geralmente uma API de recurso HTTP. Esses serviços são desenvolvidos em torno de recursos de negócios e podem ser implantados de forma independente por meio de máquinas de implantação totalmente automatizadas.

Esse modelo de arquitetura ganhou bastante notoriedade na comunidade de desenvolvimento e arquitetura de software, mas qual é o problema então? O problema é a romantização desses conceitos. Você e / ou sua empresa não é a *Netflix, Google ou Facebook*. Microsserviços não são uma bala de prata e o monolítico não é um vilão, então não romantize isso. Uma empresa pode sim ter uma aplicação monolítica e ter uma boa escalabilidade, um baixo acoplamento e uma alta coesão, tudo vai depender de como essa aplicação monolítica foi construída e estruturada. Da mesma forma que componentizar uma aplicação que contém um emaranhado de código ruim, altamente acoplado e com uma baixa coesão não vai tornar torná-la mais escalável e coesa. Você só vai ganhar novos problemas e gastar mais dinheiro.

Não estou aqui para dizer que microsserviços são ruins, longe disso. Peço apenas que analise com cautela o contexto a qual está você está inserido e o problema que você precisa resolver, para que possa tomar a melhor decisão. Se você não fizer isso, estará apenas criando novos monólitos distribuídos e aumentando a complexidade dos seus ativos de software e isso a longo prazo vai sair muito mais caro do que você pode imaginar.

______________________________________________________________

Referências:

FOWLER, M. **Microservices: a definition of this new architectural term**. martinFowler.com, 25, mar. 2014. Disponível em: <https://martinfowler.com/articles/microservices.html>. Acesso em: 10 de ago. de 2021.

NEWMAN, S. **Migrando sistemas monolíticos para microsserviços**: Padrões evolutivos para transformar seu sistema monolítico. São Paulo: Novatec, 2020.
