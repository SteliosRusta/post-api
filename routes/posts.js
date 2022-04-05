import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString:
    "postgres://vvmxzlqz:gitxeIRMYhHThd4k48u0iBvvrHm0lSMS@hattie.db.elephantsql.com/vvmxzlqz",
});

//DataBase
// id SERIAL PRIMARY KEY,
// title varchar(255) ,
// paragraph varchar(255) ,
// image varchar(255),
// author varchar(255)

export const getAllPosts = async (req, res) => {
  try {
    const { rows: posts } = await pool.query("SELECT * FROM posts;");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const { rowCount, rows: post } = await pool.query(
      "SELECT * FROM posts WHERE id = $1",
      [id]
    );
    if (!rowCount) return res.status(404).json({ error: "No post for you!" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    console.log(req.file, req.body);
    const {
      body: { title, paragraph, author },
    } = req;
    if (!title || !paragraph || !author) {
      throw new Error("Invalid body");
    }
    const query =
      "INSERT INTO posts (title,paragraph,author) VALUES($1, $2, $3) RETURNING *";
    const values = [title, paragraph, author];
    const {
      rows: [newPost],
    } = await pool.query(query, values);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const { rowCount } = await pool.query(
      "DELETE FROM posts WHERE ID = $1 RETURNING *",
      [id]
    );
    if (rowCount) {
      return res.json({ msg: `Post with id of ${id} was deleted!` });
    } else {
      throw new Error("Post doesnt exist.");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const {
      params: { id },
      body: { title, paragraph, image, author },
    } = req;
    console.log(id);
    const { rowCount: found } = await pool.query(
      "SELECT * FROM posts WHERE id = $1",
      [id]
    );
    if (!found) {
      throw new Error("The POST doesnt exist");
    }
    if (!title || !paragraph || !image || !author) {
      throw new Error("Invalid body");
    }
    const {
      rowCount,
      rows: [post],
    } = await pool.query(
      "UPDATE posts SET title=$2, paragraph=$3, image=$4, author=$5 WHERE id = $1 RETURNING *",
      [id, title, paragraph, image, author]
    );
    if (!rowCount)
      return res
        .status(404)
        .json({ error: `Post with id of $[id] not found ` });
    console.log(post);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
