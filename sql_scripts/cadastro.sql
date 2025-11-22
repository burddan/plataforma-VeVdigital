CREATE TABLE estados (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	uf CHAR(2) NOT NULL UNIQUE
);

CREATE TABLE cidades (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(150) NOT NULL,
	estado_id INT NOT NULL REFERENCES estados(id)
);

CREATE TABLE usuario_idoso (
	id SERIAL PRIMARY KEY,

	nome VARCHAR(30) NOT NULL,       
	tipo_foto VARCHAR(20),           
	caminho_foto TEXT,               

	data_nascimento DATE NOT NULL,
	sexo VARCHAR(20) NOT NULL,      

	cidade_id INT REFERENCES cidades(id),

	criado_em TIMESTAMPTZ DEFAULT NOW()
);

