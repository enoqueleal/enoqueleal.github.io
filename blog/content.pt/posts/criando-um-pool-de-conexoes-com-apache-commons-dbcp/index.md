---
title: "Criando um pool de conexões com Apache Commons DBCP"
date: 2023-05-16T23:11:16Z
lastmod: 2023-07-31T12:31:07Z
tags: ["java", "bancodedados"]
summary: "Tutorial passo a passo, em Java, para configurar um pool de conexões com Apache Commons DBCP no IntelliJ IDEA: da dependência no pom.xml à classe que centraliza o BasicDataSource, para reaproveitar conexões e melhorar o desempenho da aplicação."
devto:
  id: 1470497
  url: https://dev.to/enoqueleal/criando-um-pool-de-conexoes-com-apache-commons-dbcp-1528
---

## Este laboratório tem como objetivo apresentar uma forma básica sobre como configurar um pool de conexões para gerenciar as conexões com o banco de dados!

Um pool de conexões é uma técnica usada para melhorar o desempenho de aplicações que fazem uso frequente de conexões com um banco de dados.

Neste tutorial eu irei mostrar como implementando um Pool de Conexões em Java utilizando a biblioteca (library) **[Apache Commons DBCP](https://github.com/apache/commons-dbcp);**.

É importante mencionar que existem várias bibliotecas disponíveis para implementar um pool de conexões em Java.

Algumas alternativas populares incluem HikariCP, C3P0 e Tomcat JDBC Pool. No entanto, para este tutorial, iremos utilizar a Apache Commons DBCP por ser uma biblioteca amplamente utilizada e com uma grande comunidade de suporte.

Após concluir este tutorial, você deverá ser capaz de:

- Implementar um pool de conexões utilizando a biblioteca [Apache Commons DBCP](https://github.com/apache/commons-dbcp);

Caso você queira ver esse tutorial em formato de vídeo, eu deixei disponível no **You Tube**: [Criando e configurando um Connection Pool com Apache Commons DBCP](https://youtu.be/HcAkUWNJxbQ).

Passo 1: Adicionando a dependência

No IntelliJ IDEA, abra o arquivo de configuração do projeto chamado "pom.xml" (geralmente localizado na raiz do projeto).

Localize a seção `<dependencies>` e adicione a seguinte dependência:

```xml

<dependency>
  <groupId>org.apache.commons</groupId>
  <artifactId>commons-dbcp2</artifactId>
  <version>2.9.0</version>
</dependency>


```
Nenhum código deve ser removido nesta etapa. Apenas adicione a nova dependência no *pom.xml*!

Salve todas as alterações **(CTRL + S)**

OBS: Após salvar as alterações, o *IntelliJ IDEA* deve sincronizar automaticamente as alterações do arquivo de configuração e baixar a biblioteca Apache Commons DBCP automaticamente.


Passo 2: Criando a classe para o Pool de Conexões

No IntelliJ IDEA, navegue até o pacote principal da sua aplicação, clique com o botão direto do mouse e selecione *New / Package* digite **config** e pressione a tecla ENTER.

Após ter criado o pacote *config*, clique com o botão direito do mouse no pacote **config** e selecione *New / Java Class*.

Defina o nome da classe como "ConnectionPoolConfig" e clique em "OK".

Passo 3: Abra a classe que acabamos de criar e implemente um método estático (static) chamado *getDataSource* que não recebe nenhum parâmetro e retorna um objeto do tipo **BasicDataSource** conforme código a seguir:

```java

import org.apache.commons.dbcp2.BasicDataSource;

public class ConnectionPoolConfig {
    
    private static BasicDataSource dataSource;

    public static BasicDataSource getDataSource() {

    }
    
}
```

OBS: Não esqueça de importar (import) a classe BasicDataSource do pacote *org.apache.commons.dbcp2*. Para realizar o importe utilizando o IntelliJ, clique com o botão direito do mouse em cima do nome da classe e utilize o atalho **(ALT + ENTER)** e selecione a opção **import class**.

Passo 4: Agora que já temos nossa classe **BasicDataSource** e nosso método **getDataSource()**, vamos iniciar a implementação. 

A primeira parte da implementação consiste em uma validação condicional que verifica se a variável *dataSource* é nula (null).

O código resultante deverá ser igual ao código a seguir:

```java

package br.com.carstore.config;

import org.apache.commons.dbcp2.BasicDataSource;

public class ConnectionPoolConfig {

    private static BasicDataSource dataSource;
    
    private static BasicDataSource getDataSource() {

        if (dataSource == null) {
            
        }

        return dataSource;

    }
    
}

```

Se o resultado dessa validação condicional for verdadeiro (true), nós iremos criar um novo *dataSource*. Caso o retorno seja falso (false), significa que já existe um dataSource criado e portando ele será retornado e nenhuma ação adicional será executada. 

Passo 5: Assumindo que o retorno da validação condicional é verdadeiro (true), é necessário criar um novo dataSource. Para isso nós iremos criar uma nova instância de **BasicDataSource** e passar alguns parâmetros sendo eles:

* URL
* Username
* Password
* Min Idle
* Max Idle
* Max total

Alguns desses parâmetros são auto descritivos como por exemplo (url, username e password). Porém os outros três parâmetros sendo (Min Idle, Max Idle e Max total) precisam ser descritos.

Esses parâmetros são necessários para que o nosso pool de conexões (BasicDataSource) possa ser configurado corretamente. 
Esses parâmetros também podem variar de acordo com as características da sua aplicação. 

A seguir, uma breve descrição sobre o papel desses parâmetros:

* MinIdle: Número mínimo de conexões ociosas no pool
* MaxIdle: Número máximo de conexões ociosas no pool
* MaxTotal: Número máximo de conexões totais no pool

Por último, vamos adicionar uma mensagem de feedback para nossos usuários sinalizando que um novo pool de conexões foi criado com sucesso.

O código resultante deverá ser igual ao código a seguir:

```java
package br.com.carstore.config;

import org.apache.commons.dbcp2.BasicDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class ConnectionPoolConfig {

    private static BasicDataSource dataSource;

    private static BasicDataSource getDataSource() {

        if (dataSource == null) {
            dataSource = new BasicDataSource();
            dataSource.setUrl("jdbc:h2:~/test");
            dataSource.setUsername("sa");
            dataSource.setPassword("sa");
            dataSource.setMinIdle(5);   // Número mínimo de conexões ociosas no pool
            dataSource.setMaxIdle(10);  // Número máximo de conexões ociosas no pool
            dataSource.setMaxTotal(50); // Número máximo de conexões totais no pool

            System.out.println("New connection pool created with successful");

        }

        return dataSource;

    }

}

```

Passo 6: Criando o método getConnection

Agora que já temos o método getDataSource devidamente implementado, vamos criar o método que devolve uma conexão com o banco de dados para os usuários.

Para isso, vamos criar um novo método estático (static) chamado getConnection que devolve uma *Connection*.

O código resultante deverá ser igual ao código a seguir:

```java
public static Connection getConnection() throws SQLException {

    return getDataSource().getConnection();

}
```

Passo 7: Criando um construtor privado

Agora que já temos o método getDataSource() e getConnection() devidamente criados, precisamos criar um construtor privado que chama o método getDataSource para iniciar um novo pool de conexões assim que nossa classe **ConnectionPoolConfig** for chamada pela primeira vez.

O código resultante deverá ser igual ao código a seguir:

```java
private ConnectionPoolConfig() {

    getDataSource();

}
```

Com toda a implementação feita, o código da classe **ConnectionPoolConfig** deverá ser igual ao código a seguir:

```java
package br.com.carstore.config;

import org.apache.commons.dbcp2.BasicDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class ConnectionPoolConfig {

    private static BasicDataSource dataSource;

    private ConnectionPoolConfig() {

        getDataSource();

    }

    private static BasicDataSource getDataSource() {

        if (dataSource == null) {
            dataSource = new BasicDataSource();
            dataSource.setUrl("jdbc:h2:~/test");
            dataSource.setUsername("sa");
            dataSource.setPassword("sa");
            dataSource.setMinIdle(5);   // Número mínimo de conexões ociosas no pool
            dataSource.setMaxIdle(10);  // Número máximo de conexões ociosas no pool
            dataSource.setMaxTotal(50); // Número máximo de conexões totais no pool

            System.out.println("New connection pool created with successful");

        }

        return dataSource;

    }

    public static Connection getConnection() throws SQLException {

        return getDataSource().getConnection();

    }

}

```

Salve todas as alterações **(CTRL + S)**

Passo 8: Criando a classe para Testar o pool de conexões

No IntelliJ IDEA, navegue até o pacote principal da sua aplicação, clique com o botão direito do mouse ne selecione "New" -> "Java Class". Defina o nome da classe como "Main" e clique em "OK".

Substitua o código gerado pelo seguinte código:

```java
import java.sql.Connection;
import java.sql.SQLException;

public class Main {

    public static void main(String[] args) {

        Connection connection = null;

        try {

            connection = ConnectionPoolConfig.getConnection();
        // Utilize a conexão para executar suas operações no banco de dados

    } catch (SQLException e) {

        e.printStackTrace();

    } finally {

        if (connection != null) {

            try {

                connection.close();

            } catch (SQLException e) {

                e.printStackTrace();

            }

        }

    }

}

```

Agora, os métodos não irão abrir mais conexões diretamente,  porque a abertura de novas conexões agora será de responsabilidade da nossa classe **BasicDataSource**.

Estamos aqui implementando o **S** do [SOLID](https://www.freecodecamp.org/news/solid-principles-explained-in-plain-english/).

Faça uma revisão tudo que foi feito até aqui!

Passo 9: Salve todas as alterações **(CTRL + S)** e execute sua aplicação.

Ao executar sua aplicação, repare que o comportamento da aplicação não mudou, porém a mensagem ("New connection pool created with successful") só é escrita uma única vez no *stdout*. 

Esse comportamento é esperado porque agora a nossa aplicação reaproveita as conexões que já foram abertas e estão disponíveis e são gerenciadas pelo nosso pool de conexões.

---

Parabéns! :+1:

Você adicionou um pool de conexões na sua aplicação utilizando a biblioteca **Apache Commons DBCP** e agora sua aplicação gerencia as conexões com o banco de dados de forma eficiente.
