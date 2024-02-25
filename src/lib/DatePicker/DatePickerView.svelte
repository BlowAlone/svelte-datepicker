<script lang="ts">
	import { getFormattedMonthWithYear, DAYS_OF_THE_WEEK } from './utils';

	export let onPrevMonthClick: () => void;
	export let onNextMonthClick: () => void;
	export let selectedMonth: number, selectedYear: number;
	export let rows: number[][];
</script>

<section>
	<div class="relative flex items-center justify-center">
		<div id="datepicker" class="relative z-20 w-full max-w-[540px] h-full shadow-lg">
			<div class="bg-gray-100 sm:rounded-md dark:bg-gray-900">
				<div class="w-full">
					<div class="w-full p-4 md:p-8">
						<div class="flex items-center justify-between">
							<button
								type="button"
								on:click={onPrevMonthClick}
								aria-label="предыдущий месяц"
								class="text-gray-800 dark:text-gray-200 previous-month"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="icon icon-tabler icon-tabler-chevron-left"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<polyline points="15 6 9 12 15 18" />
								</svg>
							</button>
							<span class="text-lg font-bold text-gray-800 dark:text-gray-200 focus:outline-none"
								>{getFormattedMonthWithYear(selectedMonth, selectedYear)}</span
							>
							<button
								type="button"
								on:click={onNextMonthClick}
								aria-label="следующий месяц"
								class="ml-3 text-gray-800 dark:text-gray-200 next-month"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="icon icon-tabler icon-tabler-chevron-right"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<polyline points="9 6 15 12 9 18" />
								</svg>
							</button>
						</div>
						<div class="flex items-center justify-between pt-6 overflow-x-auto day-table">
							<table class="w-full">
								<thead>
									<tr>
										{#each DAYS_OF_THE_WEEK as day}
											<th>
												<div class="flex justify-center w-full">
													<p
														class="text-base font-medium text-center text-gray-700 dark:text-gray-300"
													>
														{day}
													</p>
												</div>
											</th>
										{/each}
									</tr>
								</thead>

								<tbody>
									{#each rows as col}
										<tr>
											{#each col as date}
												<td>
													{#if date}
														<slot {date} />
													{/if}
												</td>
											{/each}
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
</style>
