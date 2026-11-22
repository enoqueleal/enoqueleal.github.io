---
title: "Golang for Java Developers: parte 1"
date: 2022-07-17T15:17:56Z
lastmod: 2022-07-19T11:37:16Z
tags: ["go", "java"]
summary: "O objetivo deste artigo é mostrar algumas Características da da linguagem Go a partir da perspectiva..."
devto:
  id: 995475
  url: https://dev.to/enoqueleal/golang-for-java-developers-part-1--3a5n
---

O objetivo deste artigo é mostrar algumas Características da da linguagem Go a partir da perspectiva de um desenvolvedor Java. Para que a leitura não fiquei muito cansativa, eu irei dividir esse artigo em algumas partes, sendo essa portanto a parte 1.

Eu trabalho com o desenvolvimento de software há mais de uma década e durante essa jornada tive a oportunidade de trabalhar e conhecer diversas linguagens de programação compiladas e interpretadas, conhecer diversas tecnologias e frameworks, porém o Java é a linguagem que esteve mais presente durante essa trajetória. Por conta disso, eu considero o Java como a minha principal linguagem de programação.

Recentemente fui convidado a participar de um projeto, onde minha atividade consistia em pegar uma aplicação que havia sido desenvolvida em Java e reescrevê-la para Go em um modelo _As Is / To Be_.

OBS: Não faz parte do escopo deste artigo justificar o porquê de tal decisão. O que posso compartilhar aqui é que tal projeto era bem estratégico, onde o tempo de inicialização da aplicação era muito importante.

Após alguns _benchmarks_, o _Golang_ mostrou um tempo de inicialização muito satisfatório e também um mecanismo de _multithreading_ fácil de usar com base na implementação das suas _goroutines_.

Dado esse breve contexto, quero compartilhar algumas percepções em relação a essa fabulosa linguagem a partir da perspectiva de um dev Java.

---

**Let's start**

_Main class_

Estrutura básica da classe principal escrita em Go:

```

package main

import “fmt”

func main() {

    fmt.Println(“Hello, world!”)

}

```

Implementação equivalente em Java:

```

public class MainClass {

    public static void main(String [] args) {

        System.out.println(“Hello, world”);

    }
}

```


É possível notar algumas semelhanças entre as duas implementações, porém vamos dar ênfase nas diferenças entre elas:

**1**) Go dispensa a utilização de ponto e vírgula;

**2**) A implementação em Go possui apenas a declaração das funções, mas nenhuma declaração de nome de classe, dando a sensação que em Go trabalhamos apenas com escopo de função e não de classe. 

_**OBS**: Isso não deixa de ser verdade, mas falaremos disso mais adiante;_

**3**) A declaração explícita da visibilidade da função utilizando palavras reservadas como public, protected ou private não é necessárias;

**4**)  O import em Go referência apenas ao nome do pacote e não ao nome da classe.

Alguns dos pontos supramencionados me trouxeram bastante estranheza no primeiro momento, já outro um encantamento em relação ao design da linguagem, pois afinal de contas, porque colocar obrigatoriamente ponto e vírgula no final da declaração de uma variável ou na chamada de uma função? rsrs

Na próxima sessão trarei mais alguns pontos interessantes. Até breve!
