const mysql = require('mysql2/promise');

async function testAuthMethods() {
  const methods = [
    { name: 'default', config: { host:'localhost', port:3307, user:'root', password:'root' }},
    { name: 'mysql_native_password', config: { 
      host:'localhost', 
      port:3307, 
      user:'root', 
      password:'root',
      authPlugins: {
        mysql_native_password: () => () => Buffer.from('root')
      }
    }},
    { name: 'mysql_clear_password', config: {
      host:'localhost', 
      port:3307, 
      user:'root', 
      password:'root',
      authPlugins: {
        mysql_clear_password: () => () => Buffer.from('root')
      }
    }}
  ];

  for (const method of methods) {
    try {
      const conn = await mysql.createConnection(method.config);
      console.log(`✅ Success with ${method.name} authentication`);
      await conn.end();
      return;
    } catch (err) {
      console.log(`❌ Failed with ${method.name}: ${err.message}`);
    }
  }
  console.log('All authentication methods failed');
}

testAuthMethods();
