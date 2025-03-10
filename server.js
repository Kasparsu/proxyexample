import { serve } from "bun";

const server = serve({
  port: 3000,
  routes: {
    "/proxy/*": async (req) => {
        
        let url = req.url.replace('http://localhost:3000/proxy', '');
        console.log(req);
        const params = new URLSearchParams();
        Object.keys(req.params).forEach((key) => {
            params.append(key, req.params[key]);
        });
        
        let res = await fetch(`https://rickandmortyapi.com${url}?${params}`, {
            method: req.method,
        })
        console.log(res);
        let json = await res.body.json();
      return Response.json(json);
    },
  },
});

console.log(`Listening on localhost:${server.port}`);