# Demo360 · Enfoque360 AI Interactive Demo

Demostración interactiva y funcional de **IA aplicada para empresas**, desarrollada para **Enfoque360**.

Diseñada para ser recorrida en **3 a 5 minutos** (en desktop o escaneando un código QR en mobile), ilustrando el flujo de trabajo:

$$\text{CONTEXTO} \rightarrow \text{CONSULTA} \rightarrow \text{ANÁLISIS} \rightarrow \text{DETECCIÓN} \rightarrow \text{PROPUESTA} \rightarrow \text{ACCIÓN SUPERVISADA}$$

---

## 🌟 Características Principales

1. **Pantalla de Entrada de Alto Impacto:** Introducción directa con propuesta de valor y acceso al workspace.
2. **Fuentes Conectadas (Simuladas):** Conexión multi-fuente indexada a CRM, Gmail, Google Calendar y Google Drive con inspector de trazabilidad.
3. **Agente Comercial (Módulo Estrella):**
   - Análisis y cruce de 5 fuentes con animación paso a paso (~2.4s).
   - Métricas de pipeline ($18,4M ARS), oportunidades activas, clientes en seguimiento y alertas (+10 días sin actividad).
   - Panel de **Evidencia y Trazabilidad** para verificar las fuentes de cada conclusión.
   - **Acciones Supervisadas (*Human-in-the-Loop*):** Modales editables para borradores de email, convocatorias a reunión y actualización de CRM, requiriendo aprobación humana.
   - Input libre con reconocimiento de intención semántica.
4. **Copiloto de Diagnóstico PyME:** Evaluación organizacional en 4 pilares: *Personas, Estructura, Procesos y Resultados*.
5. **Operaciones & Planta:** Detección de cuellos de botella en remitos, abastecimiento y mantenimiento.
6. **Administración & Finanzas:** Tareas impositivas AFIP, facturación de anticipos y cálculo de potencial de automatización.
7. **Modo “Cómo funciona”:** Flujo interactivo visual para directivos y tomadores de decisiones.
8. **Pantalla de Cierre:** Conclusión conceptual y formulario para solicitar un relevamiento de primer caso de uso.

---

## 🚀 Tecnologías

- **React 19** + **TypeScript**
- **Vite 8** (Build estático ultra rápido)
- **Tailwind CSS** (Paleta cálida corporativa Enfoque360: Naranja, Coral, Bordó)
- **Lucide Icons**
- **Canvas Confetti**

---

## 🛠️ Ejecución Local

```bash
# Instalar dependencias
npm install

# Iniciar entorno de desarrollo
npm run dev

# Generar build estático para producción
npm run build

# Previsualizar build localmente
npm run preview
```

---

## 🌐 Despliegue en la Nube

El proyecto produce un bundle estático en la carpeta `dist/` que puede desplegarse en:
- **Vercel:** `npx vercel`
- **Netlify:** `npx netlify deploy --prod --dir=dist`
- **GitHub Pages** / **Cloudflare Pages**
