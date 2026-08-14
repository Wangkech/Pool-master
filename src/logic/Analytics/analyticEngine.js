// import { parseSync } from "vite";
import { SessionAnalytics } from "./sessionAnalytics";

export class AnalyticEngine {
  constructor() {
    this.currentSession = null;
    this.pastSessions = null;
  }
  #analyseCurrentSession(session) {
    this.currentSession = new SessionAnalytics(session);
  }
  #analysePastSessions(sessions) {
    const pastSessions = [];
    sessions.map((session) => {
      const analyzed = new SessionAnalytics(session);
      pastSessions.push(analyzed.getStats());
    });
    this.pastSessions = pastSessions;
  }
  getCurrentSessionStats(session, order) {
    this.#analyseCurrentSession(session);
    return this.currentSession.getStats(order);
  }
  getAllTimeStats(sessions) {
    this.#analysePastSessions(sessions);
  }
  getPlayersStats() {
    return this.currentSession.getStats();
  }
}
