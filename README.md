# Next.js OpenJira App
Para correr localmente se necesita la base de datos
```
docker-compose up -d 
```

* Si estas en windows probar con ejecutar este comando solo una vez y luego start en docker desktop:
```
docker run -d -p 27017:27017 -v mongo:/data/db --name=entries-database mongo:5.0.0

```

* El -d, significa detached ___detached___
* MONGO DB URL LOCAL
```
mongodb://localhost:27017/entriesdb
```

##Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

*Reconstruir los modulos de node y levantar next
```
yarn install
yarn dev
```

##Llnar base de datos con informacion de pruebas

Llamar:
```
    http://localhost:3000/api/seed
```