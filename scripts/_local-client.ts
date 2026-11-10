// Imported FIRST by every database script. Command-line scripts always use the Node libSQL client, which understands both
// `file:` databases and remote Turso URLs; the HTTP-only client is for the deployed (edge) app.
process.env.LOCAL_DB = "1";
