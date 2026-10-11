import * as instanceService from "../service/instanceService";
import { getContainerTarget } from "../libs/instanceManager";
import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router: Router = Router();

router.use("/:instanceId", async (req, res, next) => {
  const instanceId = req.params.instanceId;
  const instance = await instanceService.getInstanceById(instanceId);
  if (!instance) {
    return res.status(404).json({ message: "Instance not found" });
  }
  const target = instance.targetUrl.startsWith("http://localhost:3000")
    ? await getContainerTarget(`c-${instanceId}`)
    : instance.targetUrl;
  try {
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^/${instanceId}`]: "",
      },
    })(req, res, next);
  } catch (error) {
    console.error("Error in proxy middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
