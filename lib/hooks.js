import { useCallback, useEffect, useState } from "react";

export function useMount(callback) {
	useEffect(callback, []);
}
